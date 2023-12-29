"use client";

import { NextPage } from 'next';
import PostList, { Post } from './components/PostList';
import NewPostForm from './components/NewPostForm';
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3000/posts');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: Post[] = await res.json();
      setPosts(data.reverse());
    } catch (error) {
      setErrorMessage(true)
      console.error('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, [posts.length]);

  const handleAddPost = async (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);

  };

  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-start  p-20 page">
      {errorMessage ? <h1 className="text-2xl font-bold">Something went wrong, please try again later...</h1> :
        <>
          <div>
            <h1 className="text-2xl font-bold">Welcome to My Blog</h1>
          </div>
          <NewPostForm onAddPost={handleAddPost} />
          {posts.length === 0 ? <p>Please wait...</p> :
            <PostList posts={posts} setPosts={setPosts} />
          }
        </>}
    </main>
  );
};

export default Home;
