"use client";

import { useState, useEffect } from "react";
import UseIsLoading from "../hooks/useIsLoading";
import Link from "next/link";
import { useUser } from "../context/user";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string; // You may want to use a Date type if available in your API response
  updatedAt: string; // Similarly, use a Date type if available
};

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchPosts = async () => {
      UseIsLoading(true);
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data);
        UseIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        UseIsLoading(false);
      }
      UseIsLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div>
        {posts.map((post) => (
          <div key={post.id} className="border p-4 mb-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="mt-2">{post.content}</p>
            {user ? (
              <Link
                className="bg-blue-500 text-white py-1 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                key={post.id}
                href={`/post/${post.id}`}
              >
                Edit
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
