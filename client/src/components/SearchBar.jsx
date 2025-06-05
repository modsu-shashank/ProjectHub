import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative flex items-center w-full max-w-3xl mx-auto transition-all duration-300 ${
        isFocused 
          ? 'ring-2 ring-blue-500 shadow-lg' 
          : 'ring-1 ring-gray-300 dark:ring-gray-700 shadow'
      } rounded-full bg-white dark:bg-gray-800`}
    >
      <Search 
        size={18} 
        className="ml-4 text-gray-500 dark:text-gray-400 flex-shrink-0" 
      />
      <input
        type="text"
        placeholder="Search for projects, technologies, or keywords..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full py-3 px-4 text-gray-700 dark:text-gray-200 bg-transparent border-none focus:ring-0 focus:outline-none"
      />
      {query && (
        <button 
          type="button" 
          onClick={handleClear}
          className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
      <button
        type="submit"
        className="flex-shrink-0 py-2 px-4 mr-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;