"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [repos, setRepos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("/api/fetchRepos");
        if (!res.ok) {
          throw new Error("Failed to fetch repos");
        }
        const data = await res.json();
        setRepos(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    };

    fetchRepos();
  }, []);

  return (
    <div>
      {repos.map((repo, idx) => (
        <div key={idx}>
          <Link href={`/review/${repo.full_name}`}>{repo.name}</Link>
        </div>
      ))}
    </div>
  );
}
