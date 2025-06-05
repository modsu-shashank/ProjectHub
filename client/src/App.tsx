import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import SubmitProjectPage from './pages/SubmitProjectPage';
import BookmarksPage from './pages/BookmarksPage';
import CategoryPage from './pages/CategoryPage';
import { projects } from './data/projects';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App() {
  // Load bookmarks from localStorage
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem('projectHubBookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });
  
  // Update localStorage when bookmarks change
  useEffect(() => {
    localStorage.setItem('projectHubBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  const handleToggleBookmark = (projectId: string) => {
    setBookmarks(prevBookmarks => {
      if (prevBookmarks.includes(projectId)) {
        return prevBookmarks.filter(id => id !== projectId);
      } else {
        return [...prevBookmarks, projectId];
      }
    });
  };
  
  const handleClearBookmarks = () => {
    setBookmarks([]);
  };
  
  const handleSubmitProject = async (project: any) => {
    // In a real application, this would send the project to an API
    // For this demo, we'll just add it to our local array
    projects.unshift(project);
    return Promise.resolve();
  };
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <ScrollToTop />
        
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  bookmarks={bookmarks} 
                  onToggleBookmark={handleToggleBookmark} 
                />
              } 
            />
            <Route 
              path="/explore" 
              element={
                <ExplorePage 
                  bookmarks={bookmarks} 
                  onToggleBookmark={handleToggleBookmark} 
                />
              } 
            />
            <Route 
              path="/project/:id" 
              element={
                <ProjectDetailPage 
                  bookmarks={bookmarks} 
                  onToggleBookmark={handleToggleBookmark} 
                />
              } 
            />
            <Route 
              path="/submit" 
              element={
                <SubmitProjectPage 
                  onSubmitProject={handleSubmitProject} 
                />
              } 
            />
            <Route 
              path="/bookmarks" 
              element={
                <BookmarksPage 
                  bookmarks={bookmarks} 
                  onToggleBookmark={handleToggleBookmark} 
                  onClearBookmarks={handleClearBookmarks}
                />
              } 
            />
            <Route 
              path="/category/:id" 
              element={
                <CategoryPage 
                  bookmarks={bookmarks} 
                  onToggleBookmark={handleToggleBookmark} 
                />
              } 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;