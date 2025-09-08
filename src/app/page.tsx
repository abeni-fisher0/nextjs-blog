"use client";

import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import PostCard, { Post } from "./components/PostCard";

const WP_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(
        `${WP_BASE}/articles?per_page=10&page=1&_embed`,
        { cache: "no-store" }
      );
      const data: Post[] = await res.json();
      const total = Number(res.headers.get("x-wp-totalpages")) || 1;
      setPosts(data);
      setTotalPages(total);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const loadMore = async () => {
    if (page >= totalPages) return;
    const nextPage = page + 1;
    const res = await fetch(
      `${WP_BASE}/articles?per_page=10&page=${nextPage}&_embed`,
      { cache: "no-store" }
    );
    const newPosts: Post[] = await res.json();
    setPosts([...posts, ...newPosts]);
    setPage(nextPage);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    const res = await fetch(`${WP_BASE}/articles?search=${query}&_embed`, {
      cache: "no-store",
    });
    const results: Post[] = await res.json();
    setPosts(results);
    setPage(1);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6">Latest Posts</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full mb-6 p-2 border rounded"
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              const query = (e.target as HTMLInputElement).value;
              handleSearch(query);
            }
          }}
        />

        {/* Posts */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        {page < totalPages && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="mt-8 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </Layout>
  );
}
