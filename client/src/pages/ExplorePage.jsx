import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ProjectList from '../components/ProjectList';
import { projects, searchProjects, getProjectsByCategory, getProjectsByDifficulty } from '../data/projects';

const ExplorePage = ({ bookmarks, onToggleBookmark }) => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, selectedDifficulty]);
  
  const applyFilters = () => {
    let result = [...projects];
    
    // Apply search filter
    if (searchQuery) {
      result = searchProjects(searchQuery);
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(project => project.category === selectedCategory);
    }
    
    // Apply difficulty filter
    if (selectedDifficulty) {
      result = result.filter(project => project.difficulty === selectedDifficulty);
    }
    
    setFilteredProjects(result);
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedDifficulty('');
    setSearchQuery('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Explore Projects
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <FilterBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          onReset={handleResetFilters}
        />
        
        <div className="mt-8">
          <ProjectList
            projects={filteredProjects}
            bookmarks={bookmarks}
            onToggleBookmark={onToggleBookmark}
          />
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;