"use client"

import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 border-solid h-16 w-16"></div>
      <span className="ml-2 text-blue-500 text-lg font-semibold">Loading...</span>
    </div>
  );
};

export default Loading;