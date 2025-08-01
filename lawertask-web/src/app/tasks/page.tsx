'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { tasksAPI } from '@/services/api';
import { Task } from '@/types';
import { Plus, Edit, Trash2, Calendar, User, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function TasksPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchTasks();
  }, [isAuthenticated, router]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await tasksAPI.getAll();
      setTasks(data);
    } catch (error) {
      setError('Erro ao carregar tarefas');
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return;
    }

    try {
      await tasksAPI.delete(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      alert('Erro ao excluir tarefa');
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO':
        return 'bg-yellow-100 text-yellow-800';
      case 'DOING':
        return 'bg-blue-100 text-blue-800';
      case 'DONE':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'TODO':
        return <Clock className="h-4 w-4" />;
      case 'DOING':
        return <AlertCircle className="h-4 w-4" />;
      case 'DONE':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tarefas</h1>
            <p className="text-gray-600">Gerencie suas tarefas</p>
          </div>
          <Link
            href="/tasks/new"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Nova Tarefa</span>
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <AlertCircle className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma tarefa encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">Comece criando uma nova tarefa.</p>
            <div className="mt-6">
              <Link
                href="/tasks/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Nova Tarefa
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {task.title}
                    </h3>
                    <div className="flex space-x-2">
                      <Link
                        href={`/tasks/${task.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {task.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{task.client.name}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Vencimento: {formatDate(task.dueDate)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(task.status)}
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                          {task.status === 'TODO' ? 'A Fazer' : 
                           task.status === 'DOING' ? 'Em Andamento' : 'Concluída'}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority === 'HIGH' ? 'Alta' : 
                         task.priority === 'MEDIUM' ? 'Média' : 'Baixa'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 