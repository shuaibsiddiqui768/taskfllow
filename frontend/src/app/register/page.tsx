'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Zap, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setIsLoading(true);
    try {
      await register(name, email, password);
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Decorative orbs */}
      <div className="fixed top-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-primary-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md animate-fade-in">
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center pulse-glow">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Create account</h1>
              <p className="text-sm text-surface-400">
                Join TaskFlow and boost your productivity
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-surface-300"
              >
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-surface-800/50 border border-surface-700/50 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-surface-300"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-surface-800/50 border border-surface-700/50 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-surface-300"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-surface-800/50 border border-surface-700/50 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-surface-300"
              >
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-500" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-surface-800/50 border border-surface-700/50 rounded-xl text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              id="register-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 text-base font-semibold bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl hover:from-primary-500 hover:to-purple-500 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-surface-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
