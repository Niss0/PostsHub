import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostsProvider } from './context/PostsContext';
import Layout from './components/Layout';
import PostsList from './pages/HomePage.tsx';
import PostDetails from './pages/PostDetailsPage.tsx';
import AddPost from './pages/NewPostPage.tsx';

const App: React.FC = () => {
  return (
    <PostsProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Layout>
            <Routes>
              <Route path="/" element={<PostsList />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/add-post" element={<AddPost />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </PostsProvider>
  );
};

export default App;