// API Response Types
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

// Form Types
export interface NewPost {
  title: string;
  body: string;
}

// Component Props Types
export interface PostCardProps {
  post: Post;
  onClick: (postId: number) => void;
}

export interface PostDetailsProps {
  post: Post;
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

export interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export interface AddPostFormProps {
  onSubmit: (post: NewPost) => void;
  loading: boolean;
}

// API Service Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Application State Types
export interface LoadingState {
  posts: boolean;
  postDetails: boolean;
  comments: boolean;
  addPost: boolean;
}

export interface ErrorState {
  posts: string | null;
  postDetails: string | null;
  comments: string | null;
  addPost: string | null;
}
