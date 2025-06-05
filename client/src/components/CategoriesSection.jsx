import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import * as Icons from 'lucide-react';

const CategoriesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Browse Projects by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            // Dynamically get the icon component
            const IconComponent = Icons[category.icon];
            
            return (
              <Link 
                key={category.id}
                to={`/category/${category.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 group-hover:bg-blue-600 dark:group-hover:bg-blue-700 transition-colors">
                  {IconComponent && (
                    <IconComponent 
                      size={32} 
                      className="text-blue-600 dark:text-blue-400 group-hover:text-white dark:group-hover:text-white transition-colors" 
                    />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Explore projects
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;