import React, { useState } from 'react';
import { BookmarkPlus, BookmarkCheck, ExternalLink, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { difficulties, categories } from '../data/categories';
import * as Icons from 'lucide-react';

const ProjectCard = ({ project, isBookmarked, onToggleBookmark }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const difficultyData = difficulties.find(d => d.id === project.difficulty) || difficulties[0];
  const categoryData = categories.find(c => c.id === project.category) || categories[0];
  
  // Get the icon component dynamically
  const CategoryIcon = Icons[categoryData.icon];

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-40 object-cover transform transition-transform duration-500 ease-in-out"
          loading="lazy"
          decoding="async"
          style={{ 
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyData.color}`}>
              {difficultyData.name}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center">
              {CategoryIcon && <CategoryIcon size={12} className="mr-1" />}
              {categoryData.name}
            </span>
          </div>
          
          <button 
            onClick={() => onToggleBookmark(project.id)}
            className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? (
              <BookmarkCheck size={18} className="text-blue-600 dark:text-blue-400" />
            ) : (
              <BookmarkPlus size={18} className="text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <Link to={`/project/${project.id}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <span>By {project.author}</span>
            <span>•</span>
            <span>{new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {project.youtubeLinks.length > 0 && (
              <Link 
                to={`/project/${project.id}#tutorials`}
                className="p-1.5 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                aria-label="YouTube tutorials"
              >
                <Youtube size={18} />
              </Link>
            )}
            
            <Link 
              to={`/project/${project.id}`}
              className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              aria-label="View project details"
            >
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;