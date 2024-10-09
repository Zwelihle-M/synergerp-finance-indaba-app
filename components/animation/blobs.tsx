import React from "react";

export default function Blobs() {
  return (
    <div className="relative w-full max-w-xl -z-20 hidden lg:block">
      <div
        className="animate-blob animation-blob-2000 bg-gradient-to-r from-synergblue to-warmMagenta absolute top-0 left-[800px] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[100px] 
  opacity-0 dark:opacity50"
      />

      <div
        className="animate-blob animation-blob-4000 bg-gradient-to-r from-synergblue to-warmMagenta absolute -top-[300px] left-[800px] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[100px] 
  opacity-0 dark:opacity-50"
      />
      <div className="animate-blob animation-blob-8000 bg-synergblue dark:bg-gradient-to-r from-traditionalViolet to-warmMagenta absolute top-[320px] -left-[160px] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[100px] opacity-0 dark:opacity-50" />

      <div className="animate-blob animation-blob-10000 bg-synergblue dark:bg-gradient-to-r from-traditionalViolet to-warmMagenta absolute top-[320px] left-[700px] w-[300px] h-[300px] rounded-full mix-blend-multiply filter blur-[100px] opacity-0 dark:opacity-50" />
    </div>
  );
}
