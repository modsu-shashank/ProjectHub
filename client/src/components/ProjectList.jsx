import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects, bookmarks, onToggleBookmark }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No projects found</h3>
        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isBookmarked={bookmarks.includes(project.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
};

export default ProjectList;