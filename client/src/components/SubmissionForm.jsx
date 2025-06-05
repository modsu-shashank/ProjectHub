import React, { useState } from 'react';
import { PlusCircle, Trash2, AlertCircle } from 'lucide-react';
import { categories, difficulties } from '../data/categories';
import * as Icons from 'lucide-react';

const SubmissionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    technologies: [''],
    imageUrl: '',
    resourceLinks: [{ title: '', url: '', type: 'github' }],
    youtubeLinks: ['']
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.difficulty) newErrors.difficulty = 'Difficulty is required';
    if (formData.technologies.some(tech => !tech.trim())) {
      newErrors.technologies = 'All technologies must be filled';
    }
    if (formData.resourceLinks.some(link => !link.title.trim() || !link.url.trim())) {
      newErrors.resourceLinks = 'All resource links must be complete';
    }
    if (formData.youtubeLinks.some(link => link.trim() && !link.includes('youtube.com') && !link.includes('youtu.be'))) {
      newErrors.youtubeLinks = 'Must be valid YouTube URLs';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleTechnologyChange = (index, value) => {
    const updatedTechnologies = [...formData.technologies];
    updatedTechnologies[index] = value;
    setFormData({ ...formData, technologies: updatedTechnologies });
  };
  
  const handleAddTechnology = () => {
    setFormData({ ...formData, technologies: [...formData.technologies, ''] });
  };
  
  const handleRemoveTechnology = (index) => {
    const updatedTechnologies = formData.technologies.filter((_, i) => i !== index);
    setFormData({ ...formData, technologies: updatedTechnologies });
  };
  
  const handleResourceLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.resourceLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFormData({ ...formData, resourceLinks: updatedLinks });
  };
  
  const handleAddResourceLink = () => {
    setFormData({
      ...formData,
      resourceLinks: [...formData.resourceLinks, { title: '', url: '', type: 'github' }]
    });
  };
  
  const handleRemoveResourceLink = (index) => {
    const updatedLinks = formData.resourceLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, resourceLinks: updatedLinks });
  };
  
  const handleYouTubeLinkChange = (index, value) => {
    const updatedLinks = [...formData.youtubeLinks];
    updatedLinks[index] = value;
    setFormData({ ...formData, youtubeLinks: updatedLinks });
  };
  
  const handleAddYouTubeLink = () => {
    setFormData({ ...formData, youtubeLinks: [...formData.youtubeLinks, ''] });
  };
  
  const handleRemoveYouTubeLink = (index) => {
    const updatedLinks = formData.youtubeLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, youtubeLinks: updatedLinks });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Remove empty values
      const cleanedData = {
        ...formData,
        technologies: formData.technologies.filter(tech => tech.trim()),
        resourceLinks: formData.resourceLinks.filter(link => link.title.trim() && link.url.trim()),
        youtubeLinks: formData.youtubeLinks.filter(link => link.trim())
      };
      
      // Add additional fields
      const submissionData = {
        ...cleanedData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        author: 'Anonymous User',
        featured: false,
        trending: false,
        bookmarks: 0
      };
      
      await onSubmit(submissionData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        difficulty: '',
        technologies: [''],
        imageUrl: '',
        resourceLinks: [{ title: '', url: '', type: 'github' }],
        youtubeLinks: ['']
      });
      
      alert('Project submitted successfully!');
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Failed to submit project. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Basic Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm ${
                errors.title ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.title}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm ${
                errors.description ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.description}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category*
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm ${
                  errors.category ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.category}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Difficulty*
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm ${
                  errors.difficulty ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select difficulty</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </option>
                ))}
              </select>
              {errors.difficulty && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors.difficulty}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Leave blank to use a default image
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Technologies
        </h3>
        
        <div className="space-y-4">
          {formData.technologies.map((tech, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleTechnologyChange(index, e.target.value)}
                placeholder="e.g., React, Python, TensorFlow"
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
              
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTechnology(index)}
                  className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  aria-label="Remove technology"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
          
          {errors.technologies && (
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.technologies}
            </p>
          )}
          
          <button
            type="button"
            onClick={handleAddTechnology}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle size={16} className="mr-2" />
            Add Technology
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Resource Links
        </h3>
        
        <div className="space-y-4">
          {formData.resourceLinks.map((link, index) => (
            <div key={index} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => handleResourceLinkChange(index, 'title', e.target.value)}
                    placeholder="Link Title"
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                </div>
                
                <div className="md:col-span-2 flex items-center space-x-2">
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleResourceLinkChange(index, 'url', e.target.value)}
                    placeholder="https://example.com"
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  />
                  
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveResourceLink(index)}
                      className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex-shrink-0"
                      aria-label="Remove link"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
              
              <select
                value={link.type}
                onChange={(e) => handleResourceLinkChange(index, 'type', e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="github">GitHub Repository</option>
                <option value="tutorial">Tutorial</option>
                <option value="documentation">Documentation</option>
                <option value="article">Article</option>
                <option value="other">Other</option>
              </select>
            </div>
          ))}
          
          {errors.resourceLinks && (
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.resourceLinks}
            </p>
          )}
          
          <button
            type="button"
            onClick={handleAddResourceLink}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle size={16} className="mr-2" />
            Add Resource Link
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          YouTube Tutorials
        </h3>
        
        <div className="space-y-4">
          {formData.youtubeLinks.map((link, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={link}
                onChange={(e) => handleYouTubeLinkChange(index, e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              />
              
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveYouTubeLink(index)}
                  className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  aria-label="Remove YouTube link"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
          
          {errors.youtubeLinks && (
            <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.youtubeLinks}
            </p>
          )}
          
          <button
            type="button"
            onClick={handleAddYouTubeLink}
            className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle size={16} className="mr-2" />
            Add YouTube Tutorial
          </button>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Project'}
        </button>
      </div>
    </form>
  );
};

export default SubmissionForm;