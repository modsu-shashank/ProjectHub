import React, { useState } from 'react';
import { Share2, Mail, Copy, X } from 'lucide-react';

const ShareButton = ({ title, description, url }) => {
  const [isOpen, setIsOpen] = useState(false);

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: '📱',
      action: () => {
        const text = `${title}\n\n${description}\n\n${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_self');
      }
    },
    {
      name: 'Email',
      icon: <Mail size={18} />,
      action: () => {
        const subject = encodeURIComponent(title);
        const body = encodeURIComponent(`${description}\n\n${url}`);
        window.open(`mailto:?subject=${subject}&body=${body}`, '_self');
      }
    },
    {
      name: 'LinkedIn',
      icon: '🔗',
      action: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_self');
      }
    },
    {
      name: 'Copy Link',
      icon: <Copy size={18} />,
      action: async () => {
        try {
          await navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      }
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Share2 size={18} className="mr-2" />
        Share
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            <div className="p-2">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Share via</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X size={18} />
                </button>
              </div>
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => {
                    option.action();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <span className="w-6">{typeof option.icon === 'string' ? option.icon : option.icon}</span>
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;
