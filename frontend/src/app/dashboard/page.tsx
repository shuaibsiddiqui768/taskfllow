'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { tasksAPI } from '@/lib/api';
import {
  ListTodo,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

interface Stats {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
  highPriority: number;
}

interface Task {
  _id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, tasksRes] = await Promise.all([
          tasksAPI.getStats(),
          tasksAPI.getAll({ sort: '-createdAt' }),
        ]);
        setStats(statsRes.data.stats);
        setRecentTasks(tasksRes.data.tasks.slice(0, 5));
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-surface-500/20 text-amber-900';
      case 'in-progress':
        return 'bg-amber-500/20 text-amber-800';
      case 'completed':
        return 'bg-emerald-500/20 text-emerald-800';
      default:
        return 'bg-surface-500/20 text-amber-900';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-emerald-600';
      default:
        return 'text-amber-700';
    }
  };

  const completionRate =
    stats && stats.total > 0
      ? Math.round((stats.completed / stats.total) * 100)
      : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats?.total || 0,
      icon: ListTodo,
      color: 'from-primary-500 to-primary-700',
      bgColor: 'bg-primary-500/10',
    },
    {
      label: 'In Progress',
      value: stats?.inProgress || 0,
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      label: 'Completed',
      value: stats?.completed || 0,
      icon: CheckCircle2,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'High Priority',
      value: stats?.highPriority || 0,
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-amber-950">
            {getGreeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-amber-700 mt-1">
            Here&apos;s what&apos;s happening with your tasks today.
          </p>
        </div>
        <Link
          href="/dashboard/tasks"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-primary-600 to-amber-600 text-amber-950 rounded-xl hover:from-primary-500 hover:to-amber-500 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Task
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div
            key={i}
            className="glass rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center`}
              >
                <card.icon
                  className={`w-5 h-5 bg-gradient-to-br ${card.color} bg-clip-text`}
                  style={{
                    color:
                      card.color === 'from-primary-500 to-primary-700'
                        ? '#a18072'
                        : card.color === 'from-amber-500 to-orange-500'
                          ? '#f59e0b'
                          : card.color === 'from-emerald-500 to-teal-500'
                            ? '#10b981'
                            : '#ef4444',
                  }}
                />
              </div>
            </div>
            <p className="text-3xl font-bold text-amber-950">{card.value}</p>
            <p className="text-sm text-amber-700 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Progress & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completion Rate */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-400" />
            <h2 className="text-lg font-semibold text-amber-950">Completion Rate</h2>
          </div>

          <div className="flex items-center justify-center py-6">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#e7e5e4"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${completionRate * 3.14} ${314 - completionRate * 3.14}`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#d2bab0" />
                    <stop offset="100%" stopColor="#a18072" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-amber-950">
                  {completionRate}%
                </span>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-amber-700">
            {stats?.completed || 0} of {stats?.total || 0} tasks completed
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-amber-950">Recent Tasks</h2>
            <Link
              href="/dashboard/tasks"
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              View all →
            </Link>
          </div>

          {recentTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center mb-4">
                <ListTodo className="w-8 h-8 text-amber-800" />
              </div>
              <p className="text-amber-700 mb-2">No tasks yet</p>
              <Link
                href="/dashboard/tasks"
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                Create your first task →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/30 hover:bg-white/80 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      task.priority === 'high'
                        ? 'bg-red-400'
                        : task.priority === 'medium'
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                    }`}
                  />
                  <p className="text-sm text-amber-950 flex-1 truncate">
                    {task.title}
                  </p>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium ${getStatusColor(task.status)}`}
                  >
                    {task.status === 'in-progress'
                      ? 'In Progress'
                      : task.status.charAt(0).toUpperCase() +
                        task.status.slice(1)}
                  </span>
                  <span
                    className={`text-xs font-medium hidden sm:inline ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
