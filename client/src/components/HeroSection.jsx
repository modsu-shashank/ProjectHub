import React from 'react';
import { Sparkles, ArrowRight, Rocket } from 'lucide-react';
import SearchBar from './SearchBar';

const HeroSection = ({ onSearch }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-20 md:py-32 px-4 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 opacity-10 rounded-full"></div>
        <div className="absolute top-60 -left-20 w-60 h-60 bg-indigo-500 opacity-10 rounded-full"></div>
        <div className="absolute -bottom-40 right-20 w-72 h-72 bg-purple-400 opacity-10 rounded-full"></div>
      </div>

      <div className="relative container mx-auto text-center">
        <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
          <Sparkles size={16} className="mr-2 text-yellow-300" />
          <span>Discover. Learn. Build. Share.</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
          Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Inspiration</span> for Amazing Projects
        </h1>
        
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Explore hundreds of project ideas, tutorials, and resources to fuel your creativity and build your portfolio
        </p>
        
        <div className="mb-12">
          <SearchBar onSearch={onSearch} />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="/explore" 
            className="flex items-center px-6 py-3 bg-white text-blue-900 font-medium rounded-full hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
          >
            Explore Projects
            <ArrowRight size={18} className="ml-2" />
          </a>
          
          <a 
            href="/submit" 
            className="flex items-center px-6 py-3 bg-blue-700 text-white font-medium rounded-full hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Submit Your Project
            <Rocket size={18} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;