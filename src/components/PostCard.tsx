import React from 'react';
import type { PostCardProps } from '../types';

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const handleClick = (): void => {
    onClick(post.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(post.id);
    }
  };

  return (
    <div
      className="card hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View post: ${post.title}`}
    >
      <div className="p-6">
        {/* Post ID Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Post #{post.id}
          </span>
          <span className="text-xs text-gray-500">
            User {post.userId}
          </span>
        </div>

        {/* Post Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {post.title}
        </h2>

        {/* Post Body Preview */}
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
          {post.body}
        </p>

        {/* Read More Link */}
        <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
          <span className="text-sm font-medium">Read more</span>
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
