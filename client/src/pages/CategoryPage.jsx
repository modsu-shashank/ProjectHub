import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProjectList from '../components/ProjectList';
import FilterBar from '../components/FilterBar';
import { getProjectsByCategory } from '../data/projects';
import { categories } from '../data/categories';
import * as Icons from 'lucide-react';

const CategoryPage = ({ bookmarks, onToggleBookmark }) => {
  const { id } = useParams();
  const [categoryProjects, setCategoryProjects] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [category, setCategory] = useState(null);
  
  useEffect(() => {
    const categoryData = categories.find(c => c.id === id);
    setCategory(categoryData);
    
    // Get projects for this category
    const projects = getProjectsByCategory(id);
    setCategoryProjects(projects);
    setFilteredProjects(projects);
  }, [id]);
  
  useEffect(() => {
    if (selectedDifficulty) {
      setFilteredProjects(
        categoryProjects.filter(project => project.difficulty === selectedDifficulty)
      );
    } else {
      setFilteredProjects(categoryProjects);
    }
  }, [selectedDifficulty, categoryProjects]);
  
  const handleResetFilters = () => {
    setSelectedDifficulty('');
  };
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Category not found</h2>
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    );
  }
  
  // Get the icon component dynamically
  const CategoryIcon = Icons[category.icon];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link 
            to="/explore" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to all projects
          </Link>
          
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
              {CategoryIcon && <CategoryIcon size={24} className="text-blue-600 dark:text-blue-400" />}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {category.name} Projects
            </h1>
          </div>
        </div>
        
        <FilterBar
          selectedCategory=""
          setSelectedCategory={() => {}}
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

export default CategoryPage;