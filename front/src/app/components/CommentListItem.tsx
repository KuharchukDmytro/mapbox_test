import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Comment } from '../types/types';

interface CommentListItemProps {
  comment: Comment;
  onDeleteComment: (commentId: number) => void;
  postId: number;
}

const CommentListItem: React.FC<CommentListItemProps> = ({ comment, onDeleteComment, postId }) => {

  const handleDeletePost = async (commentId: number) => {
    try {
      const deleteComment = await fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      });

      onDeleteComment(comment.id);
    } catch (error) {
      console.error('Error deleting comment');
    }
  };

  return (
    <li key={comment.id} className="comment-item flex justify-between items-center post-item">
      <div className="w-[80%] cursor-pointer">
        <h3 className="m-0 font-bold">{comment.text}</h3>
      </div>
      <div className="flex">
        <button onClick={() => handleDeletePost(comment.id)} className="text-center p-1 text-sm bg-red-400 text-white rounded w-full">
          Delete
        </button>
      </div>
    </li>
  );
};

export default CommentListItem;
