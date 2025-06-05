import React from 'react';

const YouTubeEmbed = ({ url }) => {
  // Extract video ID from YouTube URL
  const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getVideoId(url);
  
  if (!videoId) {
    return <div className="text-red-500">Invalid YouTube URL</div>;
  }
  
  return (
    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube video"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;