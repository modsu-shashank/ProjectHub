import React from 'react';
import { Trophy } from 'lucide-react';
import ProjectCard from './ProjectCard';

const FeaturedProjects = ({ projects, bookmarks, onToggleBookmark }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Trophy size={24} className="text-yellow-500 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isBookmarked={bookmarks.includes(project.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;