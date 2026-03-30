'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Zap,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/tasks', label: 'Tasks', icon: ListTodo },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 glass flex flex-col z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">TaskFlow</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-surface-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-600/20 text-primary-300 border border-primary-500/20'
                    : 'text-surface-400 hover:text-white hover:bg-surface-800/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-surface-700/30">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-surface-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            id="logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm text-surface-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 glass lg:hidden">
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-surface-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-lg font-bold gradient-text">TaskFlow</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
