# Posts Hub - React TypeScript Application

A modern, responsive React application built with TypeScript that fetches and displays posts from the JSONPlaceholder API. Features include post browsing, detailed post views with comments, search functionality, and the ability to create new posts with client-side state management.

## 🚀 Features

### ✨ Core Functionality

- **📝 Posts Display**: Browse all posts in an elegant card-based layout
- **🔍 Search**: Real-time client-side search by post title with debouncing
- **👁️ Post Details**: Detailed post view with complete content and comments
- **💬 Comments**: View all comments for each post with user information
- **➕ Add New Post**: Create new posts with form validation and local state persistence
- **📱 Responsive Design**: Fully responsive across desktop, tablet, and mobile
- **🔄 State Management**: React Context for global posts state management
- **⚡ Performance**: Custom hooks for debouncing and optimized re-renders

### 🛠️ Technical Features

- **TypeScript**: Strict typing for enhanced developer experience and bug prevention
- **React Router**: Client-side routing for seamless navigation
- **Axios**: HTTP client with proper error handling and request interceptors
- **Tailwind CSS**: Modern, utility-first styling with custom components
- **React Context**: Global state management for posts data
- **Custom Hooks**: Reusable logic for debouncing and context consumption
- **Loading States**: Comprehensive loading indicators throughout the app
- **Error Handling**: Graceful error handling with user-friendly messages
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorMessage.tsx   # Error state component
│   ├── Layout.tsx         # Main layout with navigation
│   ├── LoadingSpinner.tsx # Loading state component
│   ├── PostCard.tsx       # Individual post card
│   └── SearchBar.tsx      # Search input component
├── context/             # React Context for state management
│   ├── PostsContextDefinition.ts  # Context type definitions
│   └── PostsContext.tsx           # PostsProvider component
├── hooks/               # Custom React hooks
│   ├── useDebounce.ts   # Debouncing hook for search optimization
│   └── usePostsContext.ts # Hook for consuming posts context
├── pages/               # Main page components
│   ├── HomePage.tsx           # Main posts listing page
│   ├── PostDetailsPage.tsx    # Detailed post view with comments
│   └── NewPostPage.tsx        # Create new post form
├── services/            # API and external services
│   └── api.ts             # JSONPlaceholder API service
├── types/               # TypeScript type definitions
│   └── index.ts           # All application types
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🛠️ Technologies Used

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Custom Hooks**: React hooks for reusable logic
- **Linting**: ESLint with TypeScript support
- **Type Checking**: TypeScript with strict mode

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Niss0/PostsHub.git
cd PostsHub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 📖 API Integration

This application integrates with the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API:

- **Posts**: `https://jsonplaceholder.typicode.com/posts`
- **Post Details**: `https://jsonplaceholder.typicode.com/posts/{id}`
- **Comments**: `https://jsonplaceholder.typicode.com/comments?postId={id}`
- **Create Post**: `POST https://jsonplaceholder.typicode.com/posts`

**Note**: JSONPlaceholder is a fake API that doesn't persist data. New posts are stored in client-side state for the current session.

## 🎯 Usage Guide

### Browsing Posts

1. Visit the home page to see all posts in a grid layout
2. Use the search bar to filter posts by title (with debounced search)
3. Click on any post card to view detailed information

### Viewing Post Details

1. Click on a post from the main list
2. View the complete post content
3. Scroll down to see all comments for the post
4. Use the "Back to Posts" button to return to the main list

### Creating New Posts

1. Click "Add Post" in the navigation
2. Fill in the title and body content
3. Both fields are required with minimum length validation
4. Click "Create Post" to submit
5. New posts are added to the local state and appear immediately
6. You'll see a success message before being redirected

### Search Functionality

1. Use the search bar on the main page
2. Search is performed with debouncing (300ms delay) for performance
3. Results are filtered by post title (case-insensitive)
4. Clear the search using the "X" button or "Clear search" link

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

This project follows strict TypeScript and React best practices:

- **Strict TypeScript**: All types are explicitly defined
- **Functional Components**: Using React hooks (useState, useEffect, useMemo)
- **Type Safety**: No `any` types, comprehensive interface definitions
- **Error Boundaries**: Graceful error handling throughout the application
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Performance**: Memoized search filtering, optimized re-renders
- **State Management**: React Context for global state
- **Custom Hooks**: Reusable logic for common patterns

### Architecture Patterns

- **Context API**: Global state management for posts data
- **Custom Hooks**: Encapsulated logic for debouncing and context consumption
- **Component Composition**: Building complex UIs from simple, reusable components
- **Separation of Concerns**: Clear separation between UI, logic, and data layers
- **Type Safety**: Comprehensive TypeScript interfaces and strict typing

### Styling Conventions

- **Tailwind CSS**: Utility-first CSS framework
- **Component Classes**: Custom component classes defined in `@layer components`
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Consistent Spacing**: Using Tailwind's spacing scale
- **Loading States**: Custom loading spinners and skeleton states

## 🌟 Additional Features Implemented

Beyond the basic requirements, this application includes:

1. **Enhanced UX**: Smooth transitions, hover effects, and loading states
2. **Form Validation**: Client-side validation with helpful error messages
3. **Keyboard Navigation**: Full keyboard accessibility support
4. **Search Optimization**: Real-time search with debouncing for performance
5. **Error Recovery**: Retry mechanisms for failed API calls
6. **Loading Indicators**: Contextual loading states for different operations
7. **Responsive Images**: Optimized for different screen sizes
8. **Modern UI**: Clean, modern design with consistent spacing and typography
9. **State Persistence**: Client-side state management for new posts
10. **Performance Optimization**: Debounced search and memoized filtering

## 🐛 Error Handling

The application handles various error scenarios:

- **Network Errors**: Displays user-friendly messages for connection issues
- **API Errors**: Shows specific error messages from the API
- **Form Validation**: Real-time validation with helpful feedback
- **Not Found**: Graceful handling of missing posts or invalid routes
- **Loading States**: Clear indication of loading progress
- **Context Errors**: Proper error boundaries for context consumption

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured layout with optimal spacing
- **Tablet**: Adapted grid layouts and touch-friendly interactions
- **Mobile**: Single-column layout with mobile-optimized navigation

## 🔒 Type Safety

All components and functions are fully typed with TypeScript:

- **Interface Definitions**: Complete type definitions for all data structures
- **Component Props**: Strictly typed component interfaces
- **API Responses**: Typed responses for all API calls
- **Event Handlers**: Properly typed event handlers
- **State Management**: Typed useState and useEffect hooks
- **Context Types**: Fully typed context interfaces and providers
- **Custom Hook Types**: Typed return values and parameters

## 🎓 React Concepts Demonstrated

This project showcases several key React concepts:

- **Functional Components**: Modern React with hooks
- **Context API**: Global state management without external libraries
- **Custom Hooks**: Reusable logic encapsulation
- **Component Composition**: Building complex UIs from simple pieces
- **Props & State**: Data flow between components
- **Effect Hooks**: Side effects and lifecycle management
- **Performance Optimization**: Memoization and debouncing

## 📝 License

This project is created for educational purposes as a React skills assessment.

## 🤝 Contributing

This is a skills assessment project. For production applications, consider:

1. Adding unit and integration tests
2. Implementing more robust state management (Redux/Zustand) for larger applications
3. Adding authentication and user management
4. Implementing pagination for large datasets
5. Adding offline support with service workers
6. Performance monitoring and analytics
7. Adding more custom hooks for common patterns
8. Implementing error boundaries for better error handling

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
