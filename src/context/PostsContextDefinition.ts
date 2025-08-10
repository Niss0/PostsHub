import { createContext } from 'react';
import type { Post, NewPost } from '../types';

export interface PostsContextType {
  posts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (newPost: NewPost) => Promise<void>;
  refreshPosts: () => Promise<void>;
}

export const PostsContext = createContext<PostsContextType | undefined>(undefined);
