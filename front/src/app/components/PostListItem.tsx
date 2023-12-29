import React, { useState, useEffect } from 'react';
import { Post } from './PostList';
import Link from 'next/link';

interface Comment {
  id: number;
  text: string;
}

interface PostListItemProps {
  post: Post;
  onDeletePost: (postId: number) => void;
}

const PostListItem: React.FC<PostListItemProps> = ({ post, onDeletePost }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/posts/${post.id}/comments`);
        if (!res.ok) {
          throw new Error('Failed to fetch comments');
        }

        const data: Comment[] = await res.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    fetchComments();
  }, [post.id]);

  const handleDeletePost = async () => {
    try {
      const commments = await fetch(`http://localhost:3000/posts/${post.id}/comments`, {
        method: 'DELETE',
      });
      const res = await fetch(`http://localhost:3000/posts/${post.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete post');
      }

      onDeletePost(post.id!);
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  return (
    <li key={post.id} className="post-item flex gap-2">
      <div className="w-[80%] cursor-pointer">
        <Link href={`/${post.id}`}>
          <h3 className="m-0 font-bold">{post.title}</h3>
          <p className="text-[#555555]">{post.content}</p>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 justify-between">
          <p className="text-xs font-medium">Comments:</p>
          <p className="flex not-italic items-center text-sm justify-center p-2 w-7 h-7 rounded-full bg-gray-200">{comments.length}</p>
        </div>
        <button onClick={handleDeletePost} className="text-center p-1 text-sm bg-red-400 text-white rounded w-full">
          Delete
        </button>
      </div>
    </li>
  );
};

export default PostListItem;
