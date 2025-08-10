import React from 'react';
import type { Comment } from '../types';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="card mb-4">
      <div className="p-4">
        {/* Comment Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {comment.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                {comment.name}
              </h4>
              <p className="text-xs text-gray-500">
                {comment.email}
              </p>
            </div>
          </div>
          <span className="text-xs text-gray-400">
            #{comment.id}
          </span>
        </div>

        {/* Comment Body */}
        <p className="text-gray-700 text-sm leading-relaxed">
          {comment.body}
        </p>
      </div>
    </div>
  );
};

export default CommentCard;
