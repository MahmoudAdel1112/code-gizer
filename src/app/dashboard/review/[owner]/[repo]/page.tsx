"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Checkboxes } from "@/src/app/components/Checkboxes";
// import { useAspects } from "@/src/app/context/aspectsContext";
import { useAspects } from "@/src/app/context/aspectsContext";

export default function RepoPage() {
  const { aspects } = useAspects();
  const params = useParams();
  const owner = Array.isArray(params.owner) ? params.owner[0] : params.owner;
  const repo = Array.isArray(params.repo) ? params.repo[0] : params.repo;

  const [AIResult, setAIResult] = useState<any>(null);
  const [loading, setLoading] = useState(false); // Initial state false
  const [error, setError] = useState<string | null>(null);

  const [files, setFiles] = useState<any>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const filesResponse = await fetch(`/api/files/${owner}/${repo}`);
      setFiles(await filesResponse.json());
    };
    fetchFiles();
  }, [owner, repo]);
  const handleFetch = async () => {
    if (files) {
      if (!owner || !repo) {
        setError("Missing owner or repo parameter");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/review/${owner}/${repo}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ aspects, files }), // Send aspects here
        });
        const data = await response.json();
        const review = data.review;

        const cleanedReviewString = review
          .replace(/```json\n/, "") // Remove starting markdown
          .replace(/```$/, "") // Remove ending markdown
          .trim(); // Clean extra spaces or newlines

        // Step 2: Parse the JSON string
        let parsedReview;

        try {
          parsedReview = JSON.parse(cleanedReviewString);
        } catch (error) {
          console.error("Failed to parse review JSON:", error);
        }
        if (!response.ok) {
          throw new Error(data.error || "Request failed");
        }

        setAIResult(parsedReview);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  return (
    <div>
      <h1>
        {owner}/{repo} Code Review
      </h1>

      <Checkboxes />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleFetch}
        disabled={loading}
      >
        {loading ? "Reviewing..." : "Let AI review your code"}
      </button>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {AIResult && <pre>{AIResult.summary.overview}</pre>}
    </div>
  );
}
