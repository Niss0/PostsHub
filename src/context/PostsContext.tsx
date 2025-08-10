import React, { useState, useEffect } from 'react';
import { PostsContext, type PostsContextType } from './PostsContextDefinition';
import type { Post, NewPost, ApiError } from '../types';
import { apiService } from '../services/api';

interface PostsProviderProps {
  children: React.ReactNode;
}

export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshPosts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await apiService.getPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (newPost: NewPost): Promise<void> => {
    // Call the API (even though it's fake)
    const createdPost = await apiService.createPost(newPost);
    
    // Add the new post to our local state with a realistic ID
    const postWithId: Post = {
      ...createdPost,
      id: Math.max(...posts.map(p => p.id), 0) + 1, // Generate next ID
      userId: 1,
    };
    
    // Add to the beginning of the list (most recent first)
    setPosts(prevPosts => [postWithId, ...prevPosts]);
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const value: PostsContextType = {
    posts,
    loading,
    error,
    addPost,
    refreshPosts,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
