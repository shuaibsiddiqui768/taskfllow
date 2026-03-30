import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Tasks API
export const tasksAPI = {
  getAll: (params?: { status?: string; priority?: string; sort?: string }) =>
    api.get('/tasks', { params }),
  getStats: () => api.get('/tasks/stats'),
  getOne: (id: string) => api.get(`/tasks/${id}`),
  create: (data: {
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
  }) => api.post('/tasks', data),
  update: (
    id: string,
    data: {
      title?: string;
      description?: string;
      status?: string;
      priority?: string;
      dueDate?: string;
    }
  ) => api.put(`/tasks/${id}`, data),
  delete: (id: string) => api.delete(`/tasks/${id}`),
};

export default api;
