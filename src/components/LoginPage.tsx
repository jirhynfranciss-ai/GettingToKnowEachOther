import React, { useState } from 'react';
import { Heart, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function LoginPage() {
  const [mode, setMode] = useState<'landing' | 'admin' | 'user'>('landing');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginAdmin, loginUser, loginError } = useStore();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(password);
  };

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.trim()) {
      loginUser(userId.trim().toLowerCase().replace(/\s+/g, '_'));
    }
  };

  if (mode === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-200">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Getting to Know You</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              A gentle, comfortable way to share who you are 💌
            </p>
          </div>

          {/* Role Cards */}
          <div className="space-y-4">
            <button
              onClick={() => setMode('user')}
              className="w-full bg-white rounded-2xl p-6 shadow-sm border border-rose-100 hover:border-rose-300 hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-400 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">I'm the Crush 💕</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Answer fun questions about yourself</p>
                </div>
                <div className="ml-auto text-rose-400 text-xl">›</div>
              </div>
            </button>

            <button
              onClick={() => setMode('admin')}
              className="w-full bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:border-purple-300 hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Admin Access 🔐</h2>
                  <p className="text-sm text-gray-500 mt-0.5">View responses & manage the system</p>
                </div>
                <div className="ml-auto text-purple-400 text-xl">›</div>
              </div>
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            Made with <span className="text-rose-400">♥</span> — take your time, no pressure
          </p>
        </div>
      </div>
    );
  }

  if (mode === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-200">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-1">Enter your password to continue</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
            <form onSubmit={handleAdminLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all text-gray-800"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {loginError && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span>⚠️</span> {loginError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-violet-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-violet-600 transition-all shadow-sm hover:shadow-md"
              >
                Login as Admin
              </button>
            </form>
          </div>

          <button
            onClick={() => setMode('landing')}
            className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // User login
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-200">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome! 🌸</h1>
          <p className="text-gray-500 text-sm mt-1">Enter a name to start your profile</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-rose-100">
          <form onSubmit={handleUserLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name or Username</label>
              <input
                type="text"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                placeholder="e.g. Mia, sunshine_girl..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all text-gray-800"
                required
              />
              <p className="mt-2 text-xs text-gray-400">
                💡 This will be your unique profile identifier
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-rose-500 hover:to-pink-600 transition-all shadow-sm hover:shadow-md"
            >
              Start Answering 💕
            </button>
          </form>
        </div>

        <div className="mt-4 bg-white/60 rounded-xl p-4 border border-rose-100">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            🔒 Your answers are private and only visible to the person who set this up. Take your time — there's no pressure!
          </p>
        </div>

        <button
          onClick={() => setMode('landing')}
          className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
