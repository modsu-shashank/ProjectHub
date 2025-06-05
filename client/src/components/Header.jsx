import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black shadow-md py-2' 
          : 'bg-black py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold text-white">ProjectHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-200 hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link to="/explore" className="text-gray-200 hover:text-blue-400 transition-colors">
            Explore
          </Link>
          <Link to="/submit" className="text-gray-200 hover:text-blue-400 transition-colors">
            Submit Project
          </Link>
          <Link to="/bookmarks" className="text-gray-200 hover:text-blue-400 transition-colors">
            Bookmarks
          </Link>
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-800 text-gray-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 text-gray-200"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black shadow-lg absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="p-2 text-gray-200 hover:bg-gray-800 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className="p-2 text-gray-200 hover:bg-gray-800 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/submit" 
              className="p-2 text-gray-200 hover:bg-gray-800 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Submit Project
            </Link>
            <Link 
              to="/bookmarks" 
              className="p-2 text-gray-200 hover:bg-gray-800 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Bookmarks
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;