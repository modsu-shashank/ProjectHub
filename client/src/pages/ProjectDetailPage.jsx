import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookmarkPlus, BookmarkCheck, Github, ExternalLink } from 'lucide-react';
import ShareButton from '../components/ShareButton';
import { projects } from '../data/projects';
import { difficulties, categories, resourceTypes } from '../data/categories';
import YouTubeEmbed from '../components/YouTubeEmbed';
import * as Icons from 'lucide-react';

const ProjectDetailPage = ({ bookmarks, onToggleBookmark }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    const foundProject = projects.find(p => p.id === id);
    setProject(foundProject);
    
    if (foundProject) {
      setIsBookmarked(bookmarks.includes(foundProject.id));
    }
  }, [id, bookmarks]);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project not found</h2>
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
  
  const difficultyData = difficulties.find(d => d.id === project.difficulty) || difficulties[0];
  const categoryData = categories.find(c => c.id === project.category) || categories[0];
  const CategoryIcon = Icons[categoryData.icon];
  
  const handleToggleBookmark = () => {
    onToggleBookmark(project.id);
    setIsBookmarked(!isBookmarked);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link 
            to="/explore" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to projects
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            
            <div className="flex items-center gap-3">
              <ShareButton 
                title={project.title}
                description={project.description}
                url={window.location.href}
              />
              <button
                onClick={handleToggleBookmark}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isBookmarked
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              >
              {isBookmarked ? (
                <>
                  <BookmarkCheck size={18} className="mr-2" />
                  Bookmarked
                </>
              ) : (
                <>
                  <BookmarkPlus size={18} className="mr-2" />
                  Bookmark
                </>
              )}
              </button>
            </div>
          </div>
        
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="h-48 sm:h-64 md:h-80 relative">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex -mb-px">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`py-4 px-6 text-sm font-medium border-b-2 ${
                        activeTab === 'overview'
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      Overview
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('resources')}
                      className={`py-4 px-6 text-sm font-medium border-b-2 ${
                        activeTab === 'resources'
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      Resources
                    </button>
                    
                    {project.youtubeLinks.length > 0 && (
                      <button
                        onClick={() => setActiveTab('tutorials')}
                        className={`py-4 px-6 text-sm font-medium border-b-2 ${
                          activeTab === 'tutorials'
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        Tutorials
                      </button>
                    )}
                  </nav>
                </div>
                
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Project Description
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {project.description}
                      </p>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'resources' && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Project Resources
                      </h2>
                      
                      <div className="space-y-4">
                        {project.resourceLinks.map((link, index) => {
                          const typeData = resourceTypes.find(t => t.id === link.type) || resourceTypes[0];
                          const LinkIcon = Icons[typeData.icon];
                          
                          return (
                            <a 
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4">
                                {LinkIcon && <LinkIcon size={20} className="text-gray-600 dark:text-gray-400" />}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                  {link.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {link.description}
                                </p>
                              </div>
                              <ExternalLink size={16} className="ml-auto text-gray-400" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'tutorials' && (
                    <div className="space-y-6">
                      {project.youtubeLinks.map((link, index) => (
                        <div key={index} className="space-y-2">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {link.title}
                          </h3>
                          <div className="aspect-w-16 aspect-h-9">
                            <YouTubeEmbed videoId={link.videoId} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Difficulty
                    </h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${difficultyData.color}`}>
                      {difficultyData.name}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Category
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                      {CategoryIcon && <CategoryIcon size={16} className="mr-1" />}
                      {categoryData.name}
                    </span>
                  </div>
                  
                  {project.githubUrl && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Source Code
                      </h3>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Github size={20} className="mr-2" />
                        View on GitHub
                      </a>
                    </div>
                  )}
                  
                  {project.demoUrl && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Live Demo
                      </h3>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <ExternalLink size={20} className="mr-2" />
                        View Demo
                      </a>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;