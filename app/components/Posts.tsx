
"use client"

import { useState, useEffect } from "react";
import Loading from "./Loading";
import useIsLoading from "../hooks/useIsLoading";



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
        useIsLoading(true)
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
          setPosts(data);
          useIsLoading(false)
      } catch (error) {
        console.error("Error fetching posts:", error);
        useIsLoading(false)
      }
      useIsLoading(false)
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
            </div>
          ))}
        </div>
    </div>
  );
};



export default Posts;
