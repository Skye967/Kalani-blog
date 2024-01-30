"use client"

// components/PostForm.tsx

import React, { useState } from 'react';

type PostFormProps = {
  onCreatePost: (title: string, content: string) => void;
};

const PostForm: React.FC<PostFormProps> = ({ onCreatePost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
    onCreatePost(title, content);
    // Clear the form after submission
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
        Title
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        required
      />

      <label htmlFor="content" className="block mt-4 text-gray-700 text-sm font-bold mb-2">
        Content
      </label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        required
      />

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
      >
        Create Post
      </button>
    </form>
  );
};

export default PostForm;