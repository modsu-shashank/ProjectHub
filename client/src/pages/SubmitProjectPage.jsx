import React from 'react';
import SubmissionForm from '../components/SubmissionForm';

const SubmitProjectPage = ({ onSubmitProject }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Submit a Project
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
          Share your project idea, tutorial, or resource with the community. 
          Fill out the form below with as much detail as possible to help others
          understand and implement your project.
        </p>
        
        <SubmissionForm onSubmit={onSubmitProject} />
      </div>
    </div>
  );
};

export default SubmitProjectPage;