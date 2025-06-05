import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProjects from '../components/FeaturedProjects';
import TrendingProjects from '../components/TrendingProjects';
import CategoriesSection from '../components/CategoriesSection';
import { getFeaturedProjects, getTrendingProjects, searchProjects } from '../data/projects';

const HomePage = ({ bookmarks, onToggleBookmark }) => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    // Load featured and trending projects
    setFeaturedProjects(getFeaturedProjects());
    setTrendingProjects(getTrendingProjects());
  }, []);
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSearchResults(searchProjects(query));
    } else {
      setSearchResults([]);
    }
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection onSearch={handleSearch} />
      
      {searchQuery ? (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Search Results for "{searchQuery}"
          </h2>
          
          {searchResults.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try different keywords or browse by category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isBookmarked={bookmarks.includes(project.id)}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <FeaturedProjects 
            projects={featuredProjects} 
            bookmarks={bookmarks} 
            onToggleBookmark={onToggleBookmark} 
          />
          
          <TrendingProjects 
            projects={trendingProjects} 
            bookmarks={bookmarks} 
            onToggleBookmark={onToggleBookmark} 
          />
          
          <CategoriesSection />
        </>
      )}
    </div>
  );
};

export default HomePage;