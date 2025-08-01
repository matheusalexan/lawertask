import axios from 'axios';
import { 
  AuthResponse, 
  LoginData, 
  RegisterData, 
  Task, 
  Client, 
  TaskStats,
  CreateTaskData,
  UpdateTaskData 
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Autenticação
export const authAPI = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

// Tarefas
export const tasksAPI = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get('/api/tasks');
    return response.data;
  },

  getById: async (id: string): Promise<Task> => {
    const response = await api.get(`/api/tasks/${id}`);
    return response.data;
  },

  create: async (data: CreateTaskData): Promise<Task> => {
    const response = await api.post('/api/tasks', data);
    return response.data;
  },

  update: async (id: string, data: UpdateTaskData): Promise<Task> => {
    const response = await api.patch(`/api/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/tasks/${id}`);
  },

  getStats: async (): Promise<TaskStats> => {
    const response = await api.get('/api/tasks/stats');
    return response.data;
  },
};

// Clientes
export const clientsAPI = {
  getAll: async (): Promise<Client[]> => {
    const response = await api.get('/api/clients');
    return response.data;
  },

  getById: async (id: string): Promise<Client> => {
    const response = await api.get(`/api/clients/${id}`);
    return response.data;
  },
};

export default api; 