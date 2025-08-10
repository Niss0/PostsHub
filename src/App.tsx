import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostsProvider } from './context/PostsContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage.tsx';
import PostDetailsPage from './pages/PostDetailsPage.tsx';
import NewPostPage from './pages/NewPostPage.tsx';

const App: React.FC = () => {
  return (
    <PostsProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:id" element={<PostDetailsPage />} />
              <Route path="/add-post" element={<NewPostPage />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </PostsProvider>
  );
};

export default App;