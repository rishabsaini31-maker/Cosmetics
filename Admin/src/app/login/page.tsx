'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminProvider, useAdmin } from '@/context/AdminContext';

function AdminLoginContent() {
  const router = useRouter();
  const { showToast } = useAdmin();
  const [email, setEmail] = useState('admin@vanya.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success && data.token) {
        localStorage.setItem('vanya_auth_token', data.token);
        localStorage.setItem('vanya_admin_user', JSON.stringify(data.user || { name: 'VĀNYA Admin', email: email.trim(), role: 'admin' }));
        showToast(`Welcome back, ${data.user?.name || 'Administrator'}!`, 'success');
        router.push('/');
      } else {
        setError(data.message || 'Invalid administrator credentials.');
      }
    } catch (err: any) {
      setLoading(false);
      setError('Server connection error. Please ensure backend is running.');
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@vanya.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-margin lg:p-margin-desktop font-body antialiased relative overflow-hidden">
      
      {/* Background Decorative Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-surface-container-lowest border border-surface-container-high shadow-2xl p-space-2xl z-10 relative">
        
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-space-xl border-b border-surface-container-high pb-space-lg">
          <span className="font-label-caps text-xs uppercase tracking-[0.3em] text-secondary font-bold block">
            RESTRICTED ACCESS PORTAL
          </span>
          <h1 className="font-display text-4xl text-primary uppercase tracking-[0.2em] font-medium">
            VĀNYA
          </h1>
          <p className="font-label-caps text-[0.6875rem] uppercase tracking-[0.2em] text-on-surface-variant">
            Haute Parfumerie Admin Command Center
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-space-md p-3 bg-red-900/10 border border-red-500/30 text-red-700 font-body text-xs text-center animate-in fade-in">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-space-lg">
          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1.5">
              Administrator Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vanya.com"
              className="w-full bg-surface-container-low border border-surface-container-high px-4 py-3 font-mono text-xs text-primary focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1.5">
              Secure Master Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-surface-container-low border border-surface-container-high pl-4 pr-10 py-3 font-mono text-xs text-primary focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Quick Demo Credentials Assistant */}
          <div className="bg-surface-container-low border border-surface-container-high p-3 flex items-center justify-between text-xs">
            <div>
              <span className="font-label-caps text-[0.625rem] text-secondary uppercase font-bold block">Demo Credentials</span>
              <span className="font-mono text-[0.6875rem] text-on-surface-variant">admin@vanya.com / admin123</span>
            </div>
            <button
              type="button"
              onClick={handleQuickFill}
              className="font-label-caps text-[0.625rem] uppercase tracking-wider bg-surface-container-highest border border-surface-container-high px-2.5 py-1 text-primary hover:border-primary transition-colors"
            >
              Quick Fill
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] font-bold py-3.5 hover:bg-tertiary-container transition-all disabled:opacity-50 shadow-md"
          >
            {loading ? 'AUTHENTICATING SESSION...' : 'ENTER COMMAND CENTER →'}
          </button>
        </form>

        <div className="mt-space-lg pt-space-md border-t border-surface-container-high text-center">
          <Link
            href="http://localhost:3000"
            className="font-label-caps text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
          >
            ← Return to Public E-Commerce Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <AdminProvider>
      <AdminLoginContent />
    </AdminProvider>
  );
}
