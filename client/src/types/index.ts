export interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  technologies: string[];
  imageUrl: string;
  resourceLinks: ResourceLink[];
  youtubeLinks: string[];
  createdAt: string;
  author: string;
  featured: boolean;
  trending: boolean;
  bookmarks: number;
}

export type Category = 
  | 'web' 
  | 'mobile' 
  | 'desktop' 
  | 'ai' 
  | 'game' 
  | 'blockchain' 
  | 'iot' 
  | 'data';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface ResourceLink {
  title: string;
  url: string;
  type: 'github' | 'tutorial' | 'documentation' | 'article' | 'other';
}