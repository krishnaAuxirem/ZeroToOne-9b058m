export type UserRole = 'founder' | 'mentor' | 'investor' | 'team' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  bio?: string;
  company?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  skills?: string[];
  createdAt: string;
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stage: string;
  industry: string;
  fundingNeeded: number;
  fundingRaised: number;
  teamSize: number;
  founderId: string;
  logo?: string;
  website?: string;
  location: string;
  createdAt: string;
  metrics: {
    revenue: number;
    growth: number;
    users: number;
    mrr: number;
  };
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  expertise: string[];
  rating: number;
  sessions: number;
  hourlyRate: number;
  avatar: string;
  bio: string;
  available: boolean;
  location: string;
}

export interface Investor {
  id: string;
  name: string;
  firm: string;
  type: string;
  portfolio: number;
  stage: string[];
  sectors: string[];
  minTicket: number;
  maxTicket: number;
  avatar: string;
  bio: string;
  location: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  lessons: number;
  level: string;
  category: string;
  rating: number;
  students: number;
  price: number;
  thumbnail: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  thumbnail: string;
  readTime: string;
  publishedAt: string;
  views: number;
  likes: number;
  featured: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee?: string;
  startupId?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  progress: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
