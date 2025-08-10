import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Post, Comment, NewPost, ApiError } from '../types';

// Base URL for JSONPlaceholder API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status,
    };
    return Promise.reject(apiError);
  }
);

// API Service functions
export const apiService = {
  // Fetch all posts
  async getPosts(): Promise<Post[]> {
    try {
      const response = await apiClient.get<Post[]>('/posts');
      return response.data;
    } catch (error) {
      throw error as ApiError;
    }
  },

  // Fetch a single post by ID
  async getPost(postId: number): Promise<Post> {
    try {
      const response = await apiClient.get<Post>(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error as ApiError;
    }
  },

  // Fetch comments for a specific post
  async getComments(postId: number): Promise<Comment[]> {
    try {
      const response = await apiClient.get<Comment[]>(`/comments?postId=${postId}`);
      return response.data;
    } catch (error) {
      throw error as ApiError;
    }
  },

  // Create a new post
  async createPost(newPost: NewPost): Promise<Post> {
    try {
      const response = await apiClient.post<Post>('/posts', {
        ...newPost,
        userId: 1, // Default user ID for new posts
      });
      return response.data;
    } catch (error) {
      throw error as ApiError;
    }
  },
};

export default apiService;
