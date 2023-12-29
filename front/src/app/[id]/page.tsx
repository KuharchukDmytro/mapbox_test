"use client";
import { useState, useEffect } from 'react';
import { Post } from '../components/PostList';
import { useRouter } from 'next/navigation';
import CommentList from '../components/CommentList';
import { Comment } from '../types/types';
import NewCommentForm from '../components/NewCommentForm';

const fetchData = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/posts/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: Post = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data');
    return null;
  }
};
const fetchComments = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/posts/${id}/comments`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: Comment[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data');
    return null;
  }
};

const PostPage = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState<string>("Please wait...");
  const router = useRouter();

  useEffect(() => {
    const fetchPostData = async () => {
      const postData = await fetchData(Number(params.id));
      if (postData) {
        setPost(postData);
      } else {
        setMessage("Something went wrong, please try again later...");
      }
    };

    const fetchCommentData = async () => {
      const commentData = await fetchComments(Number(params.id));
      if (commentData) {
        setComments(commentData.reverse());
      }
    };

    fetchPostData();
    fetchCommentData();
    //eslint-disable-next-line
  }, []);

  const onAddComment = async (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-start p-20 page">
      {post ?
        <>
          <div className="post-item">
            <h1 className="text-2xl font-bold text-center">{post.title}</h1>
            <h3 className="text-xl font-medium">{post.content}</h3>
          </div>
          <NewCommentForm postId={post.id} onAddComment={onAddComment} />
          {!!comments.length ? <CommentList postId={post.id} comments={comments} setComments={setComments} /> : <h1 className="text-2xl font-bold text-center">There is no comments yet...</h1>}
        </>
        : <h1 className="text-2xl font-bold text-center">{message}</h1>
      }
    </main>
  );
};

export default PostPage;
