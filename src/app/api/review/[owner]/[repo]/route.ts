import { auth } from "@/auth";
import { fetchRepoContents } from "@/src/app/lib/github/fetchRepoContents";
import analyzeCodebase from "@/src/app/lib/ai/geminiServices";
// import { Aspect } from "@/src/app/context/aspectsContext";
import { NextRequest } from "next/server";
import { Aspect } from "@/src/app/context/aspectsContext";

// interface ReviewRequestBody {
//   aspects: Aspect[]; // or whatever the structure is
// }

export async function POST(
  request: NextRequest,
  { params }: { params: { owner: string; repo: string } }
) {
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed, I only accept POST" },
      { status: 405 }
    );
  }

  const session = await auth();

  if (!session?.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { owner, repo } = await params;
  const { aspects, files } = await request.json();

  if (!owner || !repo || !aspects) {
    return Response.json(
      {
        error: `Missing parameters: ${!owner ? "owner " : ""}${
          !repo ? "repo " : ""
        }${!aspects ? "aspects" : ""}`,
      },
      { status: 400 }
    );
  }

  try {
    const review = await analyzeCodebase(files, owner, repo, aspects);
    return Response.json({ review });
  } catch (error) {
    console.error("Error during code review:", error);
    return Response.json(
      { error: "Failed to perform AI code review" },
      { status: 500 }
    );
  }
}
