// lib/github/fetchRepoContents.ts

import { Buffer } from "buffer";

// --- Constants and Helpers (Module Level) ---

const TEXT_FILE_EXTENSIONS = new Set([
  ".html",
  ".htm",
  ".js",
  ".ts",
  ".tsx",
  ".css",
  ".scss",
  ".json",
  ".txt",
  ".md",
]);

const isTextFile = (filename: string): boolean => {
  const lowercased = filename.toLowerCase();
  for (const ext of TEXT_FILE_EXTENSIONS) {
    if (lowercased.endsWith(ext)) {
      return true;
    }
  }
  return false;
};

function isValidUtf8(buffer: Buffer): boolean {
  // The original check is solid, just removing the redundant try/catch
  const decoded = buffer.toString("utf-8");
  const encoded = Buffer.from(decoded, "utf-8");
  return buffer.equals(encoded);
}

// --- Types ---

export interface RepoFile {
  path: string;
  name: string;
  content?: string;
  sha: string;
  type: "file"; // This type is specifically for files with content
  error?:
    | "INVALID_UTF8_CONTENT"
    | "CONTENT_FETCH_FAILED"
    | "CONTENT_DECODING_FAILED";
}

// --- Main Function ---

/**
 * Fetches all text-based files recursively from a GitHub repository.
 *
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param accessToken - GitHub OAuth access token
 * @param path - The path to fetch content from. Defaults to root.
 * @returns A promise that resolves to an array of file objects.
 */
export async function fetchRepoContents(
  owner: string,
  repo: string,
  accessToken: string,
  path = ""
): Promise<RepoFile[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github.v3+json",
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    // More informative error
    throw new Error(
      `GitHub API error at ${url}: ${response.status} ${response.statusText}`
    );
  }

  const data: any | any[] = await response.json();

  // Case 1: The path points to a single file
  if (!Array.isArray(data)) {
    if (data.type === "file" && isTextFile(data.name)) {
      const file = await processFileItem(data, headers);
      return [file];
    }
    return [];
  }

  // Case 2: The path points to a directory
  const promises = data.map((item) => {
    if (item.type === "dir") {
      // Recursive call for directories
      return fetchRepoContents(owner, repo, accessToken, item.path);
    }
    if (item.type === "file" && isTextFile(item.name)) {
      // Process file directly
      return processFileItem(item, headers);
    }
    // Ignore other types (symlinks, submodules, etc.)
    return Promise.resolve(null);
  });

  const settledResults = await Promise.all(promises);
  // Flatten the array and filter out nulls/empty arrays
  return settledResults.flat().filter(Boolean) as RepoFile[];
}

/**
 * Helper to process a single file item from the GitHub API.
 * Fetches content for large files and handles decoding.
 */
async function processFileItem(
  item: any,
  headers: Record<string, string>
): Promise<RepoFile> {
  let content: string | undefined;
  let error: RepoFile["error"] | undefined;

  try {
    let base64Content = item.content;

    if (!base64Content && item.url) {
      // Content is not included for files > 1MB
      const blobResponse = await fetch(item.url, { headers });
      if (!blobResponse.ok) {
        error = "CONTENT_FETCH_FAILED";
      } else {
        const blobData = await blobResponse.json();
        base64Content = blobData.content;
      }
    }
    // content is included in files < 1MB
    if (base64Content) {
      const buffer = Buffer.from(base64Content, "base64");
      if (isValidUtf8(buffer)) {
        content = buffer.toString("utf-8");
      } else {
        error = "INVALID_UTF8_CONTENT";
      }
    }
  } catch (e) {
    error = "CONTENT_DECODING_FAILED";
  }

  return {
    path: item.path,
    name: item.name,
    sha: item.sha,
    type: "file",
    content,
    error,
  };
}
