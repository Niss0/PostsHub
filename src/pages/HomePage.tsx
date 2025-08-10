import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostsContext } from '../hooks/usePostsContext';
import { useDebounce } from '../hooks/useDebounce';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const PostsList: React.FC = () => {
  const { posts, loading, error, refreshPosts } = usePostsContext();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  // Debounce the search term with 300ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter posts based on debounced search term
  const filteredPosts = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return posts;
    }
    return posts.filter(post =>
      post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [posts, debouncedSearchTerm]);

  // Handle post click
  const handlePostClick = (postId: number): void => {
    navigate(`/post/${postId}`);
  };

  // Handle retry
  const handleRetry = (): void => {
    refreshPosts();
  };

  // Handle search change
  const handleSearchChange = (term: string): void => {
    setSearchTerm(term);
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading posts..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Posts Hub
        </h1>
        <p className="text-lg text-gray-600">
          Discover and explore amazing posts from our community
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
      />

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {debouncedSearchTerm ? (
            <>
              Showing {filteredPosts.length} of {posts.length} posts for "{debouncedSearchTerm}"
              {searchTerm !== debouncedSearchTerm && (
                <span className="text-gray-400 ml-1">(searching...)</span>
              )}
            </>
          ) : (
            <>
              Showing all {posts.length} posts
              {searchTerm && (
                <span className="text-gray-400 ml-1">(searching...)</span>
              )}
            </>
          )}
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={handlePostClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
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
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.078 2.33C8.728 19.227 10.322 20 12 20c1.678 0 3.272-.773 6.078-2.67z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No posts found
          </h3>
          <p className="text-gray-600">
            {debouncedSearchTerm 
              ? `No posts match "${debouncedSearchTerm}". Try a different search term.`
              : 'No posts available at the moment.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default PostsList;
