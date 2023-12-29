// components/NewPostForm.tsx

import React, { useState } from 'react';
import { Post } from './PostList';

interface NewPostFormProps {
  onAddPost: (post: Post) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Please fill in both title and content.');
      return;
    }

    const newPost: Omit<Post, "id"> = {
      title,
      content,
    };

    setTitle('');
    setContent('');

    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Failed to add new post');
      }
      onAddPost(await response.json());

      console.log('New post added successfully:', newPost);
    } catch (error) {
      console.error('Error adding new post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-[1rem] shadow-md w-[640px]">
      <div className="mb-4 flex items-center gap-2 justify-between">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[85%] p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4 flex items-center gap-2 justify-between">
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
          Content:
        </label>
        <input
          type="text"
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-[85%] p-2 border border-gray-300 rounded"
        />
      </div>
      <button className="bg-blue-400 w-full p-2 text-center rounded text-white" onClick={handleSubmit}>Add new post</button>
    </form>
  );
};

export default NewPostForm;
