import React, { useState } from 'react';
import { useAuth, DEMO_ACCOUNTS } from '../context/AuthContext';
import { 
  Settings, User, ShieldCheck, RefreshCw, 
  Trash2, LogOut, CheckCircle2, Layers
} from 'lucide-react';

export default function SettingsPage() {
  const { user, loginDemo, logout } = useAuth();
  const [msg, setMsg] = useState("");

  const handleRoleSwitch = async (roleKey) => {
    await loginDemo(roleKey);
    setMsg(`Simulated role switched to ${roleKey.toUpperCase()}`);
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-2 border border-slate-200">
            <Settings className="w-3.5 h-3.5 text-slate-600" />
            <span>Preferences & Roles</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Platform Settings & Role Simulation
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Configure system preferences, switch user viewports, and audit credentials.
          </p>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      {/* Role Switcher Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          Quick Role Simulation
        </h3>
        <p className="text-xs text-slate-700">
          Seamlessly switch viewports to test candidate, recruiter, institution, and admin functionality without logging out.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {Object.entries(DEMO_ACCOUNTS).map(([key, acc]) => {
            const isCurrent = user?.role === acc.role;
            return (
              <div
                key={key}
                onClick={() => handleRoleSwitch(key)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isCurrent 
                    ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20' 
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 uppercase">{key}</span>
                  {isCurrent && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">{acc.name}</div>
                <div className="text-[11px] text-slate-600 truncate">{acc.email}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">Active Session</h3>
        <div className="text-xs space-y-2">
          <div><span className="text-slate-600">Logged in as: </span><strong>{user?.full_name}</strong></div>
          <div><span className="text-slate-600">Email: </span><strong>{user?.email}</strong></div>
          <div><span className="text-slate-600">Authorization Level: </span><span className="uppercase font-bold text-emerald-700">{user?.role}</span></div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
          <button
            onClick={logout}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Current Account</span>
          </button>
        </div>
      </div>

    </div>
  );
}
