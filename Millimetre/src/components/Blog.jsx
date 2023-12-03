// BlogPost.js

import React from "react";

const Blog = () => {
  return (
    <div className="max-w-4xl my-20 mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-2">Sample Blog Post</h1>
      <p className="text-gray-600 mb-4">Published on October 18, 2023</p>
      <img
        src="https://placekitten.com/400/200"
        alt="Blog Post Cover"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-800">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
        augue vel nisl congue laoreet.
      </p>
    </div>
  );
};

export default Blog;
