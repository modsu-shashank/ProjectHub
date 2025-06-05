import React, { useState, useEffect } from 'react';
import { BookmarkX } from 'lucide-react';
import ProjectList from '../components/ProjectList';
import { projects } from '../data/projects';

const BookmarksPage = ({ bookmarks, onToggleBookmark, onClearBookmarks }) => {
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);
  
  useEffect(() => {
    // Filter projects based on bookmarks
    const filtered = projects.filter(project => bookmarks.includes(project.id));
    setBookmarkedProjects(filtered);
  }, [bookmarks]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Bookmarks
          </h1>
          
          {bookmarkedProjects.length > 0 && (
            <button
              onClick={onClearBookmarks}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BookmarkX size={18} className="mr-2" />
              Clear All Bookmarks
            </button>
          )}
        </div>
        
        {bookmarkedProjects.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No bookmarks yet</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Start exploring and bookmark projects that interest you
            </p>
            <a 
              href="/explore" 
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Explore Projects
            </a>
          </div>
        ) : (
          <ProjectList
            projects={bookmarkedProjects}
            bookmarks={bookmarks}
            onToggleBookmark={onToggleBookmark}
          />
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;