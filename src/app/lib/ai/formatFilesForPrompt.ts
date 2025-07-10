// lib/ai/utils/formatFilesForPrompt.ts

export function formatFilesForPrompt(files: any) {
  if (!files) {
    throw new Error("No files provided");
  }

  console.log(files);
  const ReturnedFiles = files.files
    .map((file: any) => {
      return `---\nFile: ${file.path}\nContent:\n${file.content}`;
    })
    .join("\n\n");
  return ReturnedFiles;
}
