import axios from 'axios';

// API Base URL - adjust this based on your server configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for video uploads
});

// Types for API responses
export interface PitchUploadResponse {
  success: boolean;
  message: string;
  data?: {
    pitchId: string;
    videoUrl: string;
    thumbnailUrl: string;
    title: string;
    createdAt: string;
  };
  error?: string;
}

export interface DraftSaveResponse {
  success: boolean;
  message: string;
  data?: {
    pitchId: string;
    title: string;
    isDraft: boolean;
    createdAt: string;
  };
  error?: string;
}

// Pitch upload data interface
export interface PitchUploadData {
  title: string;
  description: string;
  industry: string;
  fundingNeeds: string;
  currency: string;
  entrepreneurId: string;
  tags?: string[];
  videoLink?: string;
  videoFile?: File;
}

// Upload pitch with video file
export const uploadPitchWithFile = async (data: PitchUploadData): Promise<PitchUploadResponse> => {
  const formData = new FormData();
  
  // Add all text fields
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('industry', data.industry);
  formData.append('fundingNeeds', data.fundingNeeds);
  formData.append('currency', data.currency);
  formData.append('entrepreneurId', data.entrepreneurId);
  
  // Add tags as comma-separated string
  if (data.tags && data.tags.length > 0) {
    formData.append('tags', data.tags.join(','));
  }
  
  // Add video file if provided
  if (data.videoFile) {
    formData.append('video', data.videoFile);
  }
  
  try {
    const response = await api.post<PitchUploadResponse>('/pitches/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Progress tracking for file uploads
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percentCompleted}%`);
        }
      },
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || 'Upload failed',
        error: error.response?.data?.error || error.message,
      };
    }
    
    return {
      success: false,
      message: 'Network error occurred',
      error: 'Unknown error',
    };
  }
};

// Upload pitch with video link (JSON)
export const uploadPitchWithLink = async (data: PitchUploadData): Promise<PitchUploadResponse> => {
  try {
    const payload = {
      title: data.title,
      description: data.description,
      industry: data.industry,
      fundingNeeds: data.fundingNeeds,
      currency: data.currency,
      entrepreneurId: data.entrepreneurId,
      tags: data.tags?.join(',') || '',
      videoLink: data.videoLink,
    };
    
    const response = await api.post<PitchUploadResponse>('/pitches/upload', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || 'Upload failed',
        error: error.response?.data?.error || error.message,
      };
    }
    
    return {
      success: false,
      message: 'Network error occurred',
      error: 'Unknown error',
    };
  }
};

// Save pitch as draft
export const savePitchAsDraft = async (data: Partial<PitchUploadData>): Promise<DraftSaveResponse> => {
  try {
    const payload = {
      title: data.title || '',
      description: data.description || '',
      industry: data.industry || '',
      fundingNeeds: data.fundingNeeds || '0',
      currency: data.currency || 'USD',
      entrepreneurId: data.entrepreneurId || '',
      tags: data.tags?.join(',') || '',
      videoLink: data.videoLink || '',
    };
    
    const response = await api.post<DraftSaveResponse>('/pitches/draft', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to save draft',
        error: error.response?.data?.error || error.message,
      };
    }
    
    return {
      success: false,
      message: 'Network error occurred',
      error: 'Unknown error',
    };
  }
};

// Test ImageKit configuration
export const testImageKitConnection = async () => {
  try {
    const response = await api.get('/pitches/test-imagekit');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || 'Connection test failed',
        error: error.message,
      };
    }
    
    return {
      success: false,
      message: 'Network error occurred',
      error: 'Unknown error',
    };
  }
};

// Entrepreneur type definition
export interface Entrepreneur {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
  interests?: string[];
  createdAt: string;
}

// Pitch type definition
export interface Pitch {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  industry: string;
  fundingNeeds: number;
  currency: string;
  entrepreneurId: string;
  entrepreneur: Entrepreneur;
  likes: number;
  comments: number;
  saves: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
  tags: string[];
}

// Pagination type
export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

// Pitches response type
export interface PitchesResponse {
  success: boolean;
  data: Pitch[];
  pagination: PaginationInfo;
  message?: string;
  error?: string;
}

// Single pitch response type
export interface SinglePitchResponse {
  success: boolean;
  data: Pitch;
  message?: string;
  error?: string;
}

// Fetch all pitches for investors (with filtering and pagination)
export const fetchAllPitches = async (params?: {
  industry?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}): Promise<PitchesResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.industry && params.industry !== 'all') {
      queryParams.append('industry', params.industry);
    }
    if (params?.sortBy) {
      queryParams.append('sortBy', params.sortBy);
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    
    const queryString = queryParams.toString();
    const url = `/pitches/all${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get<PitchesResponse>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: [],
        pagination: { total: 0, page: 1, limit: 20, pages: 0 },
        message: error.response?.data?.message || 'Failed to fetch pitches',
        error: error.response?.data?.error || error.message,
      };
    }
    
    return {
      success: false,
      data: [],
      pagination: { total: 0, page: 1, limit: 20, pages: 0 },
      message: 'Network error occurred',
      error: 'Unknown error',
    };
  }
};

// Fetch single pitch by ID
export const fetchPitchById = async (pitchId: string): Promise<SinglePitchResponse> => {
  try {
    const response = await api.get<SinglePitchResponse>(`/pitches/${pitchId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMsg = error.response?.data?.message || 'Failed to fetch pitch';
      return {
        success: false,
        data: {} as Pitch,
        message: errorMsg,
        error: error.response?.data?.error || error.message,
      };
    }
    
    return {
      success: false,
      data: {} as Pitch,
      message: 'Network error occurred',
      error: 'Unknown error',
    };
  }
};

// Fetch trending pitches
export const fetchTrendingPitches = async (limit?: number): Promise<PitchesResponse> => {
  try {
    const queryString = limit ? `?limit=${limit}` : '';
    const url = `/pitches/trending/top${queryString}`;
    
    const response = await api.get<{
      success: boolean;
      data: Pitch[];
      message?: string;
      error?: string;
    }>(url);
    
    // Transform response to match PitchesResponse format
    return {
      success: response.data.success,
      data: response.data.data,
      pagination: { 
        total: response.data.data.length, 
        page: 1, 
        limit: limit || 10, 
        pages: 1 
      },
      message: response.data.message,
      error: response.data.error,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: [],
        pagination: { total: 0, page: 1, limit: 10, pages: 0 },
        message: error.response?.data?.message || 'Failed to fetch trending pitches',
        error: error.response?.data?.error || error.message,
      };
    }
    
    return {
      success: false,
      data: [],
      pagination: { total: 0, page: 1, limit: 10, pages: 0 },
      message: 'Network error occurred',
      error: 'Unknown error',
    };
  }
};

export default api;