import React, { Dispatch, SetStateAction, useState } from 'react';
import { Comment } from '../types/types';
import CommentListItem from './CommentListItem';

interface PostListProps {
  comments: Comment[];
  setComments: Dispatch<SetStateAction<Comment[]>>;
  postId: number;
}

const CommentList: React.FC<PostListProps> = ({ comments, setComments, postId }) => {

  const handleDeleteComment = (commentId: number) => {
    setComments(prev => prev.filter((comment) => comment.id !== commentId));
  };
  return (
    <ul className="post-list">
      {comments.map((comment) => (
        <CommentListItem key={comment.id} postId={+postId} comment={comment} onDeleteComment={handleDeleteComment} />
      ))}
    </ul>
  );
};

export default CommentList;
