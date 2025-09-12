import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '@/types/user';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: 'entrepreneur' | 'investor') => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: 'entrepreneur' | 'investor') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Mock users for demo
  const mockUsers: User[] = [
    {
      id: '60a7b8c9d8f2a4b5c6d7e8f9',
      email: 'investor@demo.com',
      name: 'John Investor',
      role: 'investor',
      avatar: '',
      bio: 'Tech investor focused on AI and fintech startups',
      interests: ['AI', 'Fintech', 'Healthcare'],
      createdAt: '2024-01-01',
    },
    {
      id: '60a7b8c9d8f2a4b5c6d7e8fa',
      email: 'entrepreneur@demo.com',
      name: 'Sarah Chen',
      role: 'entrepreneur',
      avatar: '',
      bio: 'Healthcare AI researcher and founder',
      interests: ['AI', 'Healthcare'],
      createdAt: '2024-01-01',
    },
  ];

  useEffect(() => {
    // Check for stored auth data on app load
    const storedUser = localStorage.getItem('pitchbridge_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
      } catch (error) {
        localStorage.removeItem('pitchbridge_user');
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  }, []);

  const login = async (email: string, password: string, role: 'entrepreneur' | 'investor') => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Mock authentication - in real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    // Find user by email and role (for demo purposes)
    const user = mockUsers.find(u => u.email === email && u.role === role);
    
    if (user && password === 'demo123') {
      localStorage.setItem('pitchbridge_user', JSON.stringify(user));
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } else {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      throw new Error('Invalid credentials');
    }
  };

  const register = async (email: string, password: string, name: string, role: 'entrepreneur' | 'investor') => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Mock registration - in real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    // Generate a mock ObjectID format
    const generateMockObjectId = () => {
      const timestamp = Math.floor(Date.now() / 1000).toString(16);
      const randomHex = () => Math.floor(Math.random() * 16).toString(16);
      return timestamp + Array(16).fill(0).map(() => randomHex()).join('');
    };
    
    const newUser: User = {
      id: generateMockObjectId(),
      email,
      name,
      role,
      avatar: '',
      bio: '',
      interests: [],
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem('pitchbridge_user', JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      isLoading: false,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('pitchbridge_user');
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
}