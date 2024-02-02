"use client"

import React, { useState } from "react";
import PostForm from "../components/PostForm";
import { useRouter } from "next/navigation";
import UseIsLoading from "../hooks/useIsLoading";
import MainLayout from "../layouts/MainLayout";

const Home: React.FC = () => {
    const router = useRouter()

    const handleCreatePost = async (title: string, content: string) => {
      UseIsLoading(true)
    try {
      const response = await fetch("/api/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response) {
          const createdPost = await response.json();
          UseIsLoading(false)
          router.push('/')
      } else {
          console.error("Error creating post:", response);
          UseIsLoading(false);
      }
    } catch (error) {
        console.error("Error creating post:", error);
        UseIsLoading(false);
    }
        UseIsLoading(false);
  };

    return (
      <MainLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">Create a Post</h1>
          <PostForm onCreatePost={handleCreatePost} />
        </div>
      </MainLayout>
    );
};

export default Home;