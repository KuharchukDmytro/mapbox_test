import React, { Dispatch, SetStateAction, useState } from 'react';
import PostListItem from './PostListItem';

export interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostListProps {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>
}

const PostList: React.FC<PostListProps> = ({ posts, setPosts }) => {

  const handleDeletePost = (postId: number) => {
    setPosts(prev => prev.filter((post) => post.id !== postId));
  };
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} onDeletePost={handleDeletePost} />
      ))}
    </ul>
  );
};

export default PostList;
