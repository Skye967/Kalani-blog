
"use client"

import { useState, useEffect } from "react";
type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string; // You may want to use a Date type if available in your API response
  updatedAt: string; // Similarly, use a Date type if available
};

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Recent Posts</h1>

      {posts.map((post) => (
        <div key={post.id} className="border p-4 mb-4">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
