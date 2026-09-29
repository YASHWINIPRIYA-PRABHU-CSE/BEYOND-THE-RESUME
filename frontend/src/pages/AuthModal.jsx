import React, { useState } from 'react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { X, Sparkles, Lock, Mail, User, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register, loginDemo } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register({ email, password, full_name: fullName, role });
      } else {
        await login(email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message || "Authentication failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handle1ClickDemo = async (roleKey) => {
    setLoading(true);
    try {
      await loginDemo(roleKey);
      onClose();
    } catch (err) {
      setError("Demo login error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure Authentication</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isRegister ? "Create Your Account" : "Welcome Back"}
          </h2>
          <p className="text-xs text-slate-700 mt-1">
            Access your personalized career intelligence workspace
          </p>
        </div>

        {/* 1-Click Demo Buttons */}
        <div className="mb-6 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide block mb-2 text-center">
            Instant 1-Click Role Login:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handle1ClickDemo('student')}
              className="px-2.5 py-1.5 text-xs font-bold rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 text-slate-700 shadow-xs"
            >
              🎓 Student Demo
            </button>
            <button
              type="button"
              onClick={() => handle1ClickDemo('recruiter')}
              className="px-2.5 py-1.5 text-xs font-bold rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-700 text-slate-700 shadow-xs"
            >
              💼 Recruiter Demo
            </button>
            <button
              type="button"
              onClick={() => handle1ClickDemo('institution')}
              className="px-2.5 py-1.5 text-xs font-bold rounded-xl bg-white border border-slate-200 hover:border-purple-500 hover:text-purple-700 text-slate-700 shadow-xs"
            >
              🏛️ Institution Demo
            </button>
            <button
              type="button"
              onClick={() => handle1ClickDemo('admin')}
              className="px-2.5 py-1.5 text-xs font-bold rounded-xl bg-white border border-slate-200 hover:border-amber-500 hover:text-amber-700 text-slate-700 shadow-xs"
            >
              🛡️ Admin Demo
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        {/* Standard Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@beyondtheresume.ai"
                className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">User Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-xs font-bold p-2.5 border border-slate-200 rounded-xl bg-white"
              >
                <option value="student">Student / Job Seeker</option>
                <option value="recruiter">Recruiter / Company</option>
                <option value="institution">Institution / Placement Cell</option>
                <option value="admin">Platform Administrator</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-md transition-all mt-2"
          >
            {loading ? "Authenticating..." : isRegister ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-600">
          {isRegister ? "Already registered?" : "Don't have an account?"}{" "}
          <button
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="font-bold text-emerald-700 hover:text-emerald-800 underline"
          >
            {isRegister ? "Sign In here" : "Register now"}
          </button>
        </div>

      </div>
    </div>
  );
}
