export type UserRole = 'entrepreneur' | 'investor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  interests: string[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface Pitch {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  industry: string;
  fundingNeeds: number;
  currency: string;
  entrepreneurId: string;
  entrepreneur: User;
  likes: number;
  comments: number;
  saves: number;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  pitchId: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  updatedAt: string;
}