import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePostsContext } from '../hooks/usePostsContext';
import type { Post, Comment, ApiError } from '../types';
import { apiService } from '../services/api';
import CommentCard from '../components/CommentCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts } = usePostsContext();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingPost, setLoadingPost] = useState<boolean>(true);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const [postError, setPostError] = useState<string | null>(null);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const postId = Number(id);

  // Fetch post details
  useEffect(() => {
    const fetchPost = async (): Promise<void> => {
      if (!postId || isNaN(postId)) {
        setPostError('Invalid post ID');
        setLoadingPost(false);
        return;
      }

      // First, try to find the post in context (for newly created posts)
      const contextPost = posts.find(p => p.id === postId);
      if (contextPost) {
        setPost(contextPost);
        setLoadingPost(false);
        return;
      }

      // If not found in context, fetch from API (for existing posts)
      try {
        setLoadingPost(true);
        setPostError(null);
        const fetchedPost = await apiService.getPost(postId);
        setPost(fetchedPost);
      } catch (err) {
        const apiError = err as ApiError;
        setPostError(apiError.message);
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
  }, [postId, posts]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async (): Promise<void> => {
      if (!postId || isNaN(postId)) {
        setCommentsError('Invalid post ID');
        setLoadingComments(false);
        return;
      }

      try {
        setLoadingComments(true);
        setCommentsError(null);
        const fetchedComments = await apiService.getComments(postId);
        setComments(fetchedComments);
      } catch (err) {
        const apiError = err as ApiError;
        setCommentsError(apiError.message);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleRetry = (): void => {
    window.location.reload();
  };

  const handleBackClick = (): void => {
    navigate('/');
  };

  if (loadingPost) {
    return <LoadingSpinner size="lg" text="Loading post..." />;
  }

  if (postError) {
    return <ErrorMessage message={postError} onRetry={handleRetry} />;
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
        <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">
          Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleBackClick}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Posts
        </button>
      </div>

      {/* Post Content */}
      <article className="card">
        <div className="p-8">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Post #{post.id}
              </span>
              <span className="text-sm text-gray-500">
                By User {post.userId}
              </span>
            </div>
          </div>

          {/* Post Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Post Body */}
          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
              {post.body}
            </p>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Comments
            {!loadingComments && (
              <span className="ml-2 text-lg font-normal text-gray-500">
                ({comments.length})
              </span>
            )}
          </h2>
        </div>

        {loadingComments ? (
          <LoadingSpinner text="Loading comments..." />
        ) : commentsError ? (
          <ErrorMessage message={commentsError} onRetry={handleRetry} />
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No comments yet
            </h3>
            <p className="text-gray-600">
              Be the first to share your thoughts on this post!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PostDetails;
