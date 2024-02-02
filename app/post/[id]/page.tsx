"use client";

import Navbar from "@/app/components/Navbar";
import UseIsLoading from "@/app/hooks/useIsLoading";
import MainLayout from "@/app/layouts/MainLayout";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

const PostDisplay: React.FC = (props) => {
    const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    UseIsLoading(true);
    async function getPostData() {
      UseIsLoading(true);
      try {
        const response = await fetch(`/api/post/${params.id}`);
        const data = await response.json();
        setPost(data);
        UseIsLoading(false);
      } catch (error) {
        console.error("Error fetching post data: ", error);
        UseIsLoading(false);
      }
      UseIsLoading(false);
    }
    getPostData();
    UseIsLoading(false)
  }, [post, params]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatePost = async () => {
      const response = await fetch(`/api/update-post/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
      if (!response) {
        console.error("Error updating post:", response);
      } else {
        const updatedPost = await response.json();
        setPost(updatedPost);
      }
    };
    updatePost();
  };

    async function handleDelete() {
        UseIsLoading(true)
        const response = await fetch(`/api/delete-post/${post?.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

    if (!response.ok) {
        console.error("Error deleting post:", response.statusText);
        UseIsLoading(false)
    } else {
      const deletedPost = await response.json();
        console.log("Deleted post:", deletedPost);
        UseIsLoading(false)
        router.push('/')
    }
        UseIsLoading(false);
  }

  return (
    <MainLayout>
      <div>
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md my-8">
          <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={post?.title}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />

            <label
              htmlFor="content"
              className="block mt-4 text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={post?.content}
              rows={4}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
              >
                Submit
              </button>
              <button
                onClick={handleDelete}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostDisplay;
