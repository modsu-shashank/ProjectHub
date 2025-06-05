// Sample project data
export const projects = [
  {
    id: '1',
    title: 'Modern E-commerce Platform',
    description: 'Build a full-featured e-commerce website with React, Node.js, and MongoDB. Includes user authentication, product catalog, shopping cart, and payment processing.',
    category: 'web',
    difficulty: 'intermediate',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    imageUrl: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    resourceLinks: [
      { title: 'GitHub Repository', url: 'https://github.com/example/ecommerce', type: 'github' },
      { title: 'API Documentation', url: 'https://example.com/docs', type: 'documentation' },
      { title: 'Design System', url: 'https://example.com/design', type: 'other' },
    ],
    youtubeLinks: [
      'https://www.youtube.com/watch?v=ZkXmg9qQOxo',
      'https://www.youtube.com/watch?v=sfmL6bGbiN8'
    ],
    createdAt: '2023-11-15',
    author: 'Alex Johnson',
    featured: true,
    trending: true,
    bookmarks: 243
  },
  {
    id: '2',
    title: 'AI-Powered Personal Finance Tracker',
    description: 'Create a finance tracker that uses AI to categorize transactions, predict spending patterns, and provide personalized financial advice.',
    category: 'ai',
    difficulty: 'advanced',
    technologies: ['Python', 'TensorFlow', 'React', 'Flask', 'PostgreSQL'],
    imageUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    resourceLinks: [
      { title: 'Machine Learning Model', url: 'https://github.com/example/finance-ai', type: 'github' },
      { title: 'Financial API Integration', url: 'https://example.com/finance-api', type: 'documentation' },
    ],
    youtubeLinks: [
      'https://www.youtube.com/watch?v=qFZWY-b7VM4',
      'https://www.youtube.com/watch?v=Hl9yuMfcJBQ'
    ],
    createdAt: '2023-10-28',
    author: 'Sophia Chen',
    featured: true,
    trending: false,
    bookmarks: 186
  },
  {
    id: '3',
    title: 'Cross-Platform Mobile Game',
    description: 'Develop a casual mobile game using React Native that works on both iOS and Android. Features include user accounts, leaderboards, and in-app purchases.',
    category: 'game',
    difficulty: 'intermediate',
    technologies: ['React Native', 'Firebase', 'Redux', 'Unity'],
    imageUrl: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    resourceLinks: [
      { title: 'Game Assets', url: 'https://example.com/game-assets', type: 'other' },
      { title: 'React Native Tutorial', url: 'https://example.com/react-native', type: 'tutorial' },
    ],
    youtubeLinks: [
      'https://www.youtube.com/watch?v=VozPNrt-LfE',
      'https://www.youtube.com/watch?v=ysUDVsiFpbQ'
    ],
    createdAt: '2023-09-05',
    author: 'Michael Lopez',
    featured: false,
    trending: true,
    bookmarks: 129
  },
  {
    id: '4',
    title: 'Smart Home IoT Dashboard',
    description: 'Build a dashboard to monitor and control IoT devices in a smart home environment. Includes real-time data visualization and automation rules.',
    category: 'iot',
    difficulty: 'advanced',
    technologies: ['React', 'Node.js', 'MQTT', 'WebSockets', 'Arduino'],
    imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    resourceLinks: [
      { title: 'IoT Architecture', url: 'https://example.com/iot-architecture', type: 'article' },
      { title: 'Sensor Implementation', url: 'https://github.com/example/iot-sensors', type: 'github' },
    ],
    youtubeLinks: [
      'https://www.youtube.com/watch?v=w4LxG_vQlWg',
      'https://www.youtube.com/watch?v=lzFmmw5t8os'
    ],
    createdAt: '2023-12-10',
    author: 'Emma Wilson',
    featured: false,
    trending: false,
    bookmarks: 98
  },
  {
    id: '5',
    title: 'Blockchain-based Voting System',
    description: 'Develop a secure, transparent voting system using blockchain technology. Features include voter verification, vote tallying, and result verification.',
    category: 'blockchain',
    difficulty: 'advanced',
    technologies: ['Solidity', 'Ethereum', 'React', 'Web3.js', 'MetaMask'],
    imageUrl: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    resourceLinks: [
      { title: 'Smart Contract Code', url: 'https://github.com/example/voting-contracts', type: 'github' },
      { title: 'Ethereum Integration', url: 'https://example.com/ethereum-guide', type: 'documentation' },
    ],
    youtubeLinks: [
      'https://www.youtube.com/watch?v=M1BYGcLWZo4',
      'https://www.youtube.com/watch?v=coQ5dg8wM2o'
    ],
    createdAt: '2023-11-02',
    author: 'Daniel Kim',
    featured: true,
    trending: true,
    bookmarks: 215
  },
  {
    id: '6',
    title: 'Weather Data Visualization',
    description: 'Create an interactive visualization of global weather patterns using historical data. Features include animated maps, time-series analysis, and predictive models.',
    category: 'data',
    difficulty: 'intermediate',
    technologies: ['D3.js', 'React', 'Python', 'Flask', 'AWS'],
    imageUrl: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    resourceLinks: [
      { title: 'Data Processing Scripts', url: 'https://github.com/example/weather-data', type: 'github' },
      { title: 'Visualization Techniques', url: 'https://example.com/data-viz', type: 'article' },
    ],
    youtubeLinks: [
      'https://www.youtube.com/watch?v=rJQ-SVKxb5I',
      'https://www.youtube.com/watch?v=XmVPHq4NhMA'
    ],
    createdAt: '2023-08-22',
    author: 'Olivia Martinez',
    featured: false,
    trending: false,
    bookmarks: 76
  },
  {
    id: '7',
    title: 'Augmented Reality Art Exhibition',
    description: 'Develop an AR application that overlays digital art onto physical spaces. Features include custom marker recognition, 3D model rendering, and interactive elements.',
    category: 'mobile',
    difficulty: 'advanced',
    technologies: ['Unity', 'ARKit', 'ARCore', 'C#', 'Blender'],
    imageUrl: 'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    resourceLinks: [
      { title: 'AR Foundation Guide', url: 'https://example.com/ar-foundation', type: 'documentation' },
      { title: '3D Models Collection', url: 'https://github.com/example/ar-models', type: 'github' },
    ],
    youtubeLinks: [
      'https://www.youtube.com/watch?v=KxRK7xQl84I',
      'https://www.youtube.com/watch?v=NIXJJoqM8BQ'
    ],
    createdAt: '2023-10-15',
    author: 'Ryan Taylor',
    featured: true,
    trending: false,
    bookmarks: 154
  },
  {
    id: '8',
    title: 'Task Management Desktop App',
    description: 'Build a cross-platform desktop application for task management with offline capabilities and cloud synchronization.',
    category: 'desktop',
    difficulty: 'beginner',
    technologies: ['Electron', 'React', 'Node.js', 'SQLite', 'Firebase'],
    imageUrl: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    resourceLinks: [
      { title: 'Electron Starter', url: 'https://github.com/example/electron-react', type: 'github' },
      { title: 'Offline Data Sync', url: 'https://example.com/offline-sync', type: 'tutorial' },
    ],
    youtubeLinks: [
      'https://www.youtube.com/watch?v=wDnFjDjxW_0',
      'https://www.youtube.com/watch?v=cXaTkLCQiJQ'
    ],
    createdAt: '2023-07-18',
    author: 'Jessica Brown',
    featured: false,
    trending: true,
    bookmarks: 112
  }
];

// Filter projects by category
export const getProjectsByCategory = (category) => {
  return projects.filter(project => project.category === category);
};

// Filter projects by difficulty
export const getProjectsByDifficulty = (difficulty) => {
  return projects.filter(project => project.difficulty === difficulty);
};

// Get featured projects
export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

// Get trending projects
export const getTrendingProjects = () => {
  return projects.filter(project => project.trending);
};

// Search projects by title or description
export const searchProjects = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) || 
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery))
  );
};