"use client";

import PostCard, { type PostCardData } from "@/components/blog/PostCard";
import { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostCardData[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
    // Read initial q from URL
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") ?? "";
    if (q) {
      setQuery(q);
      runSearch(q);
    }
  }, []);

  function runSearch(q: string) {
    if (q.trim().length < 2) {
      setResults([]);
      setStatus("idle");
      return;
    }
    setStatus("loading");
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then(({ results: r }) => {
        setResults(r ?? []);
        setStatus("done");
      })
      .catch(() => {
        setResults([]);
        setStatus("done");
      });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(val), 350);
    // Update URL without navigation
    const url = new URL(window.location.href);
    if (val) url.searchParams.set("q", val);
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", url.toString());
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    runSearch(query);
  }

  return (
    <>
      <main style={{ backgroundColor: "var(--color-navy-50)", minHeight: "70vh" }}>
        {/* Search bar */}
        <div
          style={{
            backgroundColor: "var(--color-navy-900)",
            padding: "3rem 0",
            borderBottom: "3px solid var(--color-gold-500)",
          }}
        >
          <div className="container-blog" style={{ maxWidth: "720px" }}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-gold-500)",
                marginBottom: "1rem",
              }}
            >
              Search
            </p>
            <form onSubmit={handleSubmit}>
              <div style={{ position: "relative" }}>
                <Search
                  size={20}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--color-navy-500)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={handleChange}
                  placeholder="Search articles, topics, strategies…"
                  style={{
                    width: "100%",
                    padding: "1rem 1rem 1rem 3rem",
                    fontSize: "1.125rem",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "0.625rem",
                    color: "#fff",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                {status === "loading" && (
                  <Loader2
                    size={18}
                    style={{
                      position: "absolute",
                      right: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--color-navy-400)",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Results */}
        <div className="container-blog" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
          {status === "idle" && query.length === 0 && (
            <div style={{ textAlign: "center", paddingTop: "4rem", color: "var(--color-navy-400)" }}>
              <Search size={40} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
              <p style={{ fontSize: "1rem" }}>Start typing to search articles</p>
            </div>
          )}

          {status === "done" && results.length === 0 && (
            <div style={{ textAlign: "center", paddingTop: "4rem" }}>
              <p style={{ fontSize: "1.125rem", color: "var(--color-navy-700)", marginBottom: "0.5rem" }}>
                No articles found for &ldquo;<strong>{query}</strong>&rdquo;
              </p>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-navy-400)" }}>
                Try a different keyword, or{" "}
                <a href="/blog" style={{ color: "var(--color-signal-700)" }}>browse all articles</a>.
              </p>
            </div>
          )}

          {results.length > 0 && (
            <>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-navy-500)",
                  marginBottom: "1.5rem",
                  fontWeight: 500,
                }}
              >
                {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
              </p>
              <div
                style={{
                  display: "grid",
                  gap: "1.25rem",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                }}
              >
                {results.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <style>{`
        @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
      `}</style>
    </>
  );
}
