
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Cpu, Mail, Lock, User, ArrowRight, Loader2, AlertCircle, Sparkles } from 'lucide-react';

export const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        alert('Verification email sent! Please check your inbox.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#05060f] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-hero-glow -z-10 opacity-30" />

      <div className="w-full max-w-md space-y-8 glass-card p-10 rounded-[2.5rem] shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-500 relative overflow-hidden">
        <div className="scan-line opacity-20" />

        <div className="text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-6 shadow-xl shadow-indigo-500/20 animate-float">
            <Cpu className="text-white" size={32} />
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white mb-2">
            {isSignUp ? 'Join the Future' : 'Welcome Back'}
          </h2>
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles size={12} />
              AI-Powered Matchmaking
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            {isSignUp ? 'Create your neural profile to discover elite roles.' : 'Sign in to access your personalized AI career horizon.'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4 relative">
          {isSignUp && (
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none placeholder:text-slate-600 hover:bg-white/10"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input
              type="email"
              placeholder="Email workspace"
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none placeholder:text-slate-600 hover:bg-white/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input
              type="password"
              placeholder="Secure passcode"
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none placeholder:text-slate-600 hover:bg-white/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 text-xs bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 animate-in slide-in-from-top-2">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 button-primary text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-500/10 disabled:opacity-50 mt-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                {isSignUp ? 'Sync Profile' : 'Access Hub'}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm font-bold text-slate-500 hover:text-indigo-400 transition-colors"
          >
            {isSignUp ? 'Already have an ID? Sign In' : "New to the system? Create Identity"}
          </button>
        </div>
      </div>
    </div>
  );
};
