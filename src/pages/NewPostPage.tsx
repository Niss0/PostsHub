import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostsContext } from '../hooks/usePostsContext';
import type { NewPost, ApiError } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const AddPost: React.FC = () => {
  const navigate = useNavigate();
  const { addPost } = usePostsContext();
  const [formData, setFormData] = useState<NewPost>({
    title: '',
    body: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (formData.title.trim().length < 3) {
      setError('Title must be at least 3 characters long');
      return false;
    }
    if (!formData.body.trim()) {
      setError('Body content is required');
      return false;
    }
    if (formData.body.trim().length < 10) {
      setError('Body content must be at least 10 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const trimmedData: NewPost = {
        title: formData.title.trim(),
        body: formData.body.trim()
      };

      await addPost(trimmedData);
      setSuccess(true);
      
      // Show success message for 2 seconds, then redirect
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    navigate('/');
  };

  const handleRetry = (): void => {
    setError(null);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <svg
              className="h-8 w-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-green-800 mb-2">
            Post Created Successfully!
          </h3>
          <p className="text-green-600 mb-4">
            Your new post has been added. Redirecting to the posts list...
          </p>
          <LoadingSpinner size="sm" text="" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Post
        </h1>
        <p className="text-lg text-gray-600">
          Share your thoughts with the community
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="card">
        <div className="p-6 space-y-6">
          {/* Title Field */}
          <div>
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Post Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter an engaging title for your post..."
              className="input-field"
              maxLength={100}
              disabled={loading}
              required
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                Minimum 3 characters
              </p>
              <span className="text-xs text-gray-400">
                {formData.title.length}/100
              </span>
            </div>
          </div>

          {/* Body Field */}
          <div>
            <label 
              htmlFor="body" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Post Content *
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              placeholder="Write your post content here..."
              rows={8}
              className="input-field resize-vertical"
              maxLength={1000}
              disabled={loading}
              required
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                Minimum 10 characters
              </p>
              <span className="text-xs text-gray-400">
                {formData.body.length}/1000
              </span>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-spinner h-4 w-4 mr-2"></div>
                  Creating Post...
                </div>
              ) : (
                'Create Post'
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="btn-secondary flex-1 sm:flex-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          💡 Writing Tips
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Make your title clear and descriptive</li>
          <li>• Structure your content with proper paragraphs</li>
          <li>• Keep your audience engaged with interesting content</li>
          <li>• Proofread before publishing</li>
        </ul>
      </div>
    </div>
  );
};

export default AddPost;
