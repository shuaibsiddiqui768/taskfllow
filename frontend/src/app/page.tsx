'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  CheckCircle,
  Zap,
  BarChart3,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass !bg-primary-100/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm text-amber-900 hover:text-amber-950 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-primary-600 to-amber-600 text-amber-950 rounded-xl hover:from-primary-500 hover:to-amber-500 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-16">
        {/* Badge */}
        <div className="animate-fade-in mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-sm text-primary-300">
            <Sparkles className="w-4 h-4" />
            <span>Supercharge your productivity</span>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-5xl md:text-7xl font-extrabold text-center leading-tight mb-6 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          Manage Tasks
          <br />
          <span className="gradient-text">Like a Pro</span>
        </h1>

        <p
          className="text-lg md:text-xl text-amber-700 text-center max-w-2xl mb-10 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          Stay organized, track your progress, and crush your goals with
          TaskFlow&apos;s beautiful and intuitive task management platform.
        </p>

        {/* CTA */}
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <Link
            href="/register"
            className="group px-8 py-4 text-base font-semibold bg-gradient-to-r from-primary-600 to-amber-600 text-amber-950 rounded-2xl hover:from-primary-500 hover:to-amber-500 transition-all shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 flex items-center gap-2"
          >
            Start Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 text-base font-semibold glass text-amber-950 rounded-2xl hover:bg-white/60 transition-all flex items-center justify-center"
          >
            Sign In
          </Link>
        </div>

        {/* Features */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mt-24 w-full animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          {[
            {
              icon: CheckCircle,
              title: 'Task Management',
              desc: 'Create, organize, and track tasks with priorities and due dates.',
              color: 'from-emerald-500 to-teal-500',
            },
            {
              icon: BarChart3,
              title: 'Progress Tracking',
              desc: 'Visual dashboards to monitor your productivity and completion rates.',
              color: 'from-primary-500 to-primary-700',
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              desc: 'Instant updates and a snappy interface that keeps you in flow.',
              color: 'from-amber-500 to-orange-500',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group cursor-default"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-6 h-6 text-amber-950" />
              </div>
              <h3 className="text-lg font-semibold text-amber-950 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-amber-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-amber-800 border-t border-amber-100">
        <p>&copy; {new Date().getFullYear()} TaskFlow. Built with ❤️</p>
      </footer>
    </div>
  );
}
