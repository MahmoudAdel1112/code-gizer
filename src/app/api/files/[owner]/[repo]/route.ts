import { auth } from "@/auth";
import { fetchRepoContents } from "@/src/app/lib/github/fetchRepoContents";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string } }
) {
  const session = await auth();
  if (!session?.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { owner, repo } = await params; // Removed unnecessary await

  if (!owner || !repo) {
    return Response.json(
      {
        error: `Missing parameters: ${!owner ? "owner" : ""}${
          !repo ? "repo" : ""
        }`,
      },
      { status: 400 }
    );
  }

  try {
    const files = await fetchRepoContents(owner, repo, session.accessToken);
    return Response.json({ files });
  } catch (error: any) {
    console.error("Repository fetch error:", error);
    return Response.json(
      {
        error: "Failed to fetch repository contents",
        details: error.message || "Check console for details",
      },
      { status: 500 }
    );
  }
}
