export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'DOING' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
  clientId: string;
  client: Client;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStats {
  total: number;
  todo: number;
  doing: number;
  done: number;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  status?: 'TODO' | 'DOING' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
  clientId: string;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {} 