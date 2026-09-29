import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, Compass, ShieldCheck, UserCheck, 
  Building2, GraduationCap, LogOut, BookOpen, Layers
} from 'lucide-react';

export default function Navbar({ activePage, setActivePage, openAuthModal }) {
  const { user, logout, loginDemo } = useAuth();

  const roleColors = {
    student: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    recruiter: 'bg-blue-50 text-blue-700 border-blue-200',
    institution: 'bg-purple-50 text-purple-700 border-purple-200',
    admin: 'bg-amber-50 text-amber-700 border-amber-200'
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => setActivePage('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              BEYOND THE RESUME
            </span>
            <span className="hidden md:block text-[11px] font-medium text-slate-700 tracking-wide uppercase">
              Career Intelligence Platform
            </span>
          </div>
        </div>

        {/* Center: Role Quick Switcher Pills for Instant Pair-Testing */}
        <div className="hidden lg:flex items-center bg-slate-100/80 p-1 rounded-full border border-slate-200/80">
          <span className="text-xs font-semibold text-slate-700 px-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Switch Role:
          </span>
          <button
            onClick={() => { loginDemo('student'); setActivePage('dashboard'); }}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              user?.role === 'student' ? 'bg-white text-emerald-700 shadow-sm border border-emerald-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            Student
          </button>
          <button
            onClick={() => { loginDemo('recruiter'); setActivePage('recruiter'); }}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              user?.role === 'recruiter' ? 'bg-white text-blue-700 shadow-sm border border-blue-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            Recruiter
          </button>
          <button
            onClick={() => { loginDemo('institution'); setActivePage('institution'); }}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              user?.role === 'institution' ? 'bg-white text-purple-700 shadow-sm border border-purple-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-purple-600" />
            Institution
          </button>
          <button
            onClick={() => { loginDemo('admin'); setActivePage('model-insights'); }}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 ${
              user?.role === 'admin' ? 'bg-white text-amber-700 shadow-sm border border-amber-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            Admin
          </button>
        </div>

        {/* Right side navigation & user account */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActivePage('docs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              activePage === 'docs' 
                ? 'bg-slate-900 text-white border-slate-900' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            Docs & Viva
          </button>

          {user ? (
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
              <div 
                onClick={() => setActivePage(user.role === 'recruiter' ? 'recruiter' : user.role === 'institution' ? 'institution' : 'dashboard')}
                className="cursor-pointer text-right hidden sm:block"
              >
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {user.full_name}
                </div>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${roleColors[user.role] || 'bg-slate-100 text-slate-700'}`}>
                    {user.role}
                  </span>
                </div>
              </div>

              <div 
                onClick={() => setActivePage('profile')}
                className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-sm flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-emerald-400 transition-all shadow-sm"
                title="View Profile"
              >
                {user.full_name?.charAt(0) || 'U'}
              </div>

              <button
                onClick={logout}
                title="Sign Out"
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all"
            >
              Sign In
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
