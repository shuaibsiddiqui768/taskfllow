'use client';

import { useEffect, useState, useCallback } from 'react';
import { tasksAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  X,
  Calendar,
  Flag,
  CheckCircle2,
  Clock,
  Circle,
  ChevronDown,
} from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface TaskFormData {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

const defaultFormData: TaskFormData = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<TaskFormData>(defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const params: { status?: string; priority?: string } = {};
      if (filterStatus !== 'all') params.status = filterStatus;
      if (filterPriority !== 'all') params.priority = filterPriority;
      const res = await tasksAPI.getAll(params);
      setTasks(res.data.tasks);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filterStatus, filterPriority]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const openCreateModal = () => {
    setEditingTask(null);
    setFormData(defaultFormData);
    setShowModal(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : '',
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error('Task title is required');
      return;
    }
    setSubmitting(true);
    try {
      if (editingTask) {
        await tasksAPI.update(editingTask._id, formData);
        toast.success('Task updated!');
      } else {
        await tasksAPI.create(formData);
        toast.success('Task created!');
      }
      setShowModal(false);
      fetchTasks();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await tasksAPI.delete(id);
      toast.success('Task deleted');
      setDeleteConfirm(null);
      fetchTasks();
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleStatusToggle = async (task: Task) => {
    const statusCycle = ['todo', 'in-progress', 'completed'];
    const currentIndex = statusCycle.indexOf(task.status);
    const newStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
    try {
      await tasksAPI.update(task._id, { status: newStatus });
      fetchTasks();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo':
        return <Circle className="w-5 h-5 text-surface-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-amber-400" />;
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Circle className="w-5 h-5 text-surface-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      todo: 'bg-surface-500/20 text-surface-300',
      'in-progress': 'bg-amber-500/20 text-amber-300',
      completed: 'bg-emerald-500/20 text-emerald-300',
    };
    const labels: Record<string, string> = {
      todo: 'To Do',
      'in-progress': 'In Progress',
      completed: 'Completed',
    };
    return (
      <span
        className={`text-xs px-2.5 py-1 rounded-lg font-medium ${styles[status] || ''}`}
      >
        {labels[status] || status}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      high: 'text-red-400',
      medium: 'text-amber-400',
      low: 'text-emerald-400',
    };
    return (
      <span className={`flex items-center gap-1 text-xs font-medium ${styles[priority] || ''}`}>
        <Flag className="w-3 h-3" />
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Tasks</h1>
          <p className="text-surface-400 mt-1">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}{' '}
            total
          </p>
        </div>
        <button
          id="create-task-btn"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl hover:from-primary-500 hover:to-purple-500 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
          <input
            id="search-tasks"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-800/50 border border-surface-700/50 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            showFilters || filterStatus !== 'all' || filterPriority !== 'all'
              ? 'bg-primary-600/20 text-primary-300 border border-primary-500/20'
              : 'glass-light text-surface-300 hover:text-white'
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
          <ChevronDown
            className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="glass rounded-xl p-4 flex flex-wrap gap-4 animate-slide-up">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-surface-400">
              Status
            </label>
            <select
              id="filter-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-40 px-3 py-2 bg-surface-800/50 border border-surface-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-surface-400">
              Priority
            </label>
            <select
              id="filter-priority"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="block w-40 px-3 py-2 bg-surface-800/50 border border-surface-700/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      )}

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-surface-800/50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-surface-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {search ? 'No tasks found' : 'No tasks yet'}
          </h3>
          <p className="text-sm text-surface-400 mb-4">
            {search
              ? 'Try a different search term'
              : 'Create your first task to get started!'}
          </p>
          {!search && (
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl hover:from-primary-500 hover:to-purple-500 transition-all"
            >
              <Plus className="w-4 h-4" />
              Create Task
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task, i) => (
            <div
              key={task._id}
              className="glass rounded-xl p-4 hover:scale-[1.005] transition-all duration-200 group animate-slide-up"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <div className="flex items-start gap-3">
                {/* Status toggle */}
                <button
                  onClick={() => handleStatusToggle(task)}
                  className="mt-0.5 shrink-0 hover:scale-110 transition-transform"
                  title="Toggle status"
                >
                  {getStatusIcon(task.status)}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3
                      className={`font-medium ${
                        task.status === 'completed'
                          ? 'text-surface-500 line-through'
                          : 'text-white'
                      }`}
                    >
                      {task.title}
                    </h3>
                    {getStatusBadge(task.status)}
                    {getPriorityBadge(task.priority)}
                  </div>
                  {task.description && (
                    <p className="text-sm text-surface-400 mt-1.5 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-surface-500">
                    {task.dueDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                    <span>
                      Created{' '}
                      {new Date(task.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => openEditModal(task)}
                    className="p-2 rounded-lg text-surface-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                    title="Edit task"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {deleteConfirm === task._id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="px-2 py-1 text-xs rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="p-1 text-surface-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(task._id)}
                      className="p-2 rounded-lg text-surface-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-lg glass rounded-2xl p-6 shadow-2xl animate-slide-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingTask ? 'Edit Task' : 'Create Task'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800/50 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-surface-300">
                  Title *
                </label>
                <input
                  id="task-title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-800/50 border border-surface-700/50 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                  placeholder="What needs to be done?"
                  autoFocus
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-surface-300">
                  Description
                </label>
                <textarea
                  id="task-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-surface-800/50 border border-surface-700/50 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all resize-none"
                  placeholder="Add more details..."
                />
              </div>

              {/* Status & Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-surface-300">
                    Status
                  </label>
                  <select
                    id="task-status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-surface-800/50 border border-surface-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-surface-300">
                    Priority
                  </label>
                  <select
                    id="task-priority"
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-surface-800/50 border border-surface-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-surface-300">
                  Due Date
                </label>
                <input
                  id="task-due-date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-800/50 border border-surface-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-sm"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-medium text-surface-300 bg-surface-800/50 hover:bg-surface-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  id="save-task-btn"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-500 hover:to-purple-500 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : editingTask ? (
                    'Update Task'
                  ) : (
                    'Create Task'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
