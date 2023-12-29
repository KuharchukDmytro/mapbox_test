// components/NewPostForm.tsx

import React, { useState } from 'react';
import { Comment } from '../types/types';

interface NewCommentFormProps {
  onAddComment: (comment: Comment) => void;
  postId: number;
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({ onAddComment, postId }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text) {
      alert('Please fill text input.');
      return;
    }

    const newComment: Omit<Comment, "id"> = {
      text,
      post_id: postId,
    };

    setText('');

    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error('Failed to add new post');
      }
      onAddComment(await response.json());

      console.log('New comment added successfully:', newComment);
    } catch (error) {
      console.error('Error adding new commnt');
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
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-[85%] p-2 border border-gray-300 rounded"
        />
      </div>
      <button className="bg-blue-400 w-full p-2 text-center rounded text-white" onClick={handleSubmit}>Add new comment</button>
    </form>
  );
};

export default NewCommentForm;
