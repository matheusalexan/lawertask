'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { tasksAPI } from '@/services/api';
import { TaskStats } from '@/types';
import { BarChart3, CheckCircle, Clock, ListTodo, Plus } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await tasksAPI.getStats();
        setStats(data);
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const statCards = [
    {
      title: 'Total de Tarefas',
      value: stats?.total || 0,
      icon: ListTodo,
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
    },
    {
      title: 'A Fazer',
      value: stats?.todo || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-500',
    },
    {
      title: 'Em Andamento',
      value: stats?.doing || 0,
      icon: BarChart3,
      color: 'bg-orange-500',
      textColor: 'text-orange-500',
    },
    {
      title: 'Concluídas',
      value: stats?.done || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Visão geral das suas tarefas</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                        <Icon className={`h-6 w-6 ${stat.textColor}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/tasks/new"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Plus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Nova Tarefa</h3>
                    <p className="text-sm text-gray-600">Criar uma nova tarefa</p>
                  </div>
                </Link>

                <Link
                  href="/tasks"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ListTodo className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Ver Tarefas</h3>
                    <p className="text-sm text-gray-600">Visualizar todas as tarefas</p>
                  </div>
                </Link>

                <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Relatórios</h3>
                    <p className="text-sm text-gray-600">Em breve</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo das Tarefas */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumo das Tarefas</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-gray-900">Tarefas a Fazer</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">{stats?.todo || 0}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-gray-900">Tarefas em Andamento</span>
                  </div>
                  <span className="text-2xl font-bold text-orange-600">{stats?.doing || 0}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-900">Tarefas Concluídas</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{stats?.done || 0}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 