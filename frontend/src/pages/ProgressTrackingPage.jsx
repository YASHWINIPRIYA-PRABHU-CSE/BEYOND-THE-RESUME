import React from 'react';
import { 
  BarChart3, TrendingUp, CheckCircle2, Award, 
  MapPin, Clock, Calendar, ArrowUpRight
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

export default function ProgressTrackingPage() {
  const readinessHistory = [
    { month: 'Month 1', readiness: 58, coding: 50, resume: 55 },
    { month: 'Month 2', readiness: 66, coding: 62, resume: 65 },
    { month: 'Month 3', readiness: 74, coding: 70, resume: 75 },
    { month: 'Month 4', readiness: 84, coding: 82, resume: 84 },
  ];

  const milestonesHistory = [
    { date: 'September 2026', title: 'Achieved 82/100 in Core Programming Assessment', badge: 'Verified Credential', status: 'Completed' },
    { date: 'August 2026', title: 'Finished Stage 1: Engineering Foundations Roadmap', badge: 'Roadmap Milestone', status: 'Completed' },
    { date: 'July 2026', title: 'Shipped Cloud-Native Task Orchestrator Capstone', badge: 'Portfolio Project', status: 'Completed' },
    { date: 'June 2026', title: 'Uploaded Resume and Optimized Active Action Verbs', badge: 'Resume Audit', status: 'Completed' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Growth Velocity Analytics</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Progress Tracking & Talent Trajectory
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Track your empirical skill acquisition rate, test improvements, and milestone velocity over time.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-800">
          <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          <span>+26% Readiness Growth Across 4 Months</span>
        </div>
      </div>

      {/* Trajectory Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Readiness Velocity Over Time</h3>
            <p className="text-xs text-slate-700">Green = Overall Readiness • Blue = Coding Benchmark • Purple = Resume Score</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
            Current Tier: High Readiness
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={readinessHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#334155' }} />
              <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#334155' }} />
              <Tooltip />
              <Line type="monotone" dataKey="readiness" stroke="#059669" strokeWidth={3} name="Overall Readiness" />
              <Line type="monotone" dataKey="coding" stroke="#3b82f6" strokeWidth={2} name="Coding Score" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="resume" stroke="#8b5cf6" strokeWidth={2} name="Resume ATS" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Milestones */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm">Verified Achievement History</h3>
        
        <div className="space-y-3">
          {milestonesHistory.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-600">
                    <Calendar className="w-3 h-3" />
                    <span>{m.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {m.badge}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
