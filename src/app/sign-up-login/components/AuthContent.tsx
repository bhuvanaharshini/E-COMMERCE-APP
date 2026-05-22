'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppLogo from '@/components/ui/AppLogo';

type Tab = 'login' | 'signup';

export default function AuthContent() {
  const [tab, setTab] = useState<Tab>('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });
  const [signupForm, setSignupForm] = useState({ fullName: '', email: '', password: '', confirm: '' });
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [showSignupPw, setShowSignupPw] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 flex items-center justify-center relative overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-secondary/20 z-0" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 blob-primary z-0 opacity-50" aria-hidden="true" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 blob-secondary z-0 opacity-40" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <AppLogo size={44} />
            <span className="font-extrabold text-2xl tracking-tight text-foreground">
              Eco<span className="text-primary">Glow</span>
            </span>
          </Link>
        </div>

        {/* Auth Card */}
        <div className="glass-card rounded-[2rem] p-8 sm:p-10">
          {/* Tabs */}
          <div className="flex bg-muted rounded-full p-1 mb-8">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${
                tab === 'login' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${
                tab === 'signup' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-3 border-2 border-border rounded-2xl text-sm font-bold text-foreground hover:border-primary transition-all">
              <Icon name="GlobeAltIcon" size={18} className="text-foreground" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border-2 border-border rounded-2xl text-sm font-bold text-foreground hover:border-primary transition-all">
              <Icon name="DevicePhoneMobileIcon" size={18} className="text-foreground" />
              Apple
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Login Form */}
          {tab === 'login' && (
            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="maya@example.com"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                  className="input-eco w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showLoginPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required
                    className="input-eco w-full px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPw(!showLoginPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    <Icon name={showLoginPw ? 'EyeSlashIcon' : 'EyeIcon'} size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    name="remember"
                    type="checkbox"
                    checked={loginForm.remember}
                    onChange={handleLoginChange}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-xs font-medium text-muted-foreground">Remember me</span>
                </label>
                <Link href="#" className="text-xs font-bold text-primary hover:underline">Forgot password?</Link>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold text-sm tracking-wide hover:bg-primary/90 transition-all mt-2"
              >
                Sign In
              </button>
              <p className="text-center text-xs text-muted-foreground pt-2">
                Don't have an account?{' '}
                <button onClick={() => setTab('signup')} className="font-bold text-primary hover:underline">
                  Create one
                </button>
              </p>
            </form>
          )}

          {/* Sign Up Form */}
          {tab === 'signup' && (
            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Emma Rodriguez"
                  value={signupForm.fullName}
                  onChange={handleSignupChange}
                  required
                  className="input-eco w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="emma@example.com"
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  required
                  className="input-eco w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showSignupPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                    required
                    className="input-eco w-full px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPw(!showSignupPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    aria-label="Toggle password visibility"
                  >
                    <Icon name={showSignupPw ? 'EyeSlashIcon' : 'EyeIcon'} size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground mb-2 uppercase tracking-wider">Confirm Password</label>
                <input
                  name="confirm"
                  type="password"
                  placeholder="••••••••"
                  value={signupForm.confirm}
                  onChange={handleSignupChange}
                  required
                  className="input-eco w-full px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold text-sm tracking-wide hover:bg-primary/90 transition-all mt-2"
              >
                Create Account
              </button>
              <p className="text-center text-xs text-muted-foreground pt-2">
                By creating an account, you agree to our{' '}
                <Link href="#" className="font-bold text-primary hover:underline">Terms</Link>
                {' '}and{' '}
                <Link href="#" className="font-bold text-primary hover:underline">Privacy Policy</Link>
              </p>
              <p className="text-center text-xs text-muted-foreground">
                Already have an account?{' '}
                <button onClick={() => setTab('login')} className="font-bold text-primary hover:underline">
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}