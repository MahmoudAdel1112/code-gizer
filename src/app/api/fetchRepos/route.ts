import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  let repos;
  try {
    const session = await auth();
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const res = await fetch("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "GitHub API error" },
        { status: res.status }
      );
    }

    const repos = await res.json();
    return NextResponse.json(repos);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
