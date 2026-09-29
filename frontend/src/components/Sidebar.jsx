import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, User, FileText, CheckCircle2, TrendingUp,
  Award, Target, Compass, MapPin, Mic, BrainCircuit,
  Briefcase, BarChart3, Binary, ShieldAlert, Settings,
  GraduationCap, HelpCircle
} from 'lucide-react';

export default function Sidebar({ activePage, setActivePage }) {
  const { user } = useAuth();
  const role = user?.role || 'student';

  const navGroups = [
    {
      group: "Core Workspace",
      items: [
        { id: "dashboard", label: "Student Dashboard", icon: LayoutDashboard, badge: "Hub" },
        { id: "profile", label: "Student Profile", icon: User },
        { id: "resume", label: "Resume Analyzer", icon: FileText, badge: "NLP" },
      ]
    },
    {
      group: "Career Intelligence & ML",
      items: [
        { id: "placement", label: "Placement Prediction", icon: CheckCircle2, badge: "ML Class" },
        { id: "salary", label: "Salary Estimation", icon: TrendingUp, badge: "Regression" },
        { id: "recommendations", label: "Career Recommendations", icon: Compass },
        { id: "skill-gap", label: "Skill Gap Analysis", icon: Target },
      ]
    },
    {
      group: "Talent Readiness & Prep",
      items: [
        { id: "roadmap", label: "Learning Roadmap", icon: MapPin },
        { id: "interview", label: "Mock Interview (STAR)", icon: Mic, badge: "AI Evaluator" },
        { id: "assessments", label: "Skill Assessments", icon: Award },
        { id: "job-matcher", label: "Job Role Matcher", icon: Briefcase, badge: "TF-IDF" },
        { id: "progress", label: "Progress Tracking", icon: BarChart3 },
      ]
    },
    {
      group: "Enterprise & Academic",
      items: [
        { id: "recruiter", label: "Recruiter Talent Search", icon: Briefcase, badge: role === 'recruiter' ? 'Active Role' : '' },
        { id: "institution", label: "Institution Analytics", icon: GraduationCap, badge: role === 'institution' ? 'Active Role' : '' },
      ]
    },
    {
      group: "ML Syllabus & Governance",
      items: [
        { id: "model-insights", label: "Model Evaluation (Units 1-5)", icon: Binary, badge: "All Units" },
        { id: "responsible-ai", label: "Responsible AI & Privacy", icon: ShieldAlert },
        { id: "settings", label: "Platform Settings", icon: Settings },
        { id: "docs", label: "Viva & Documentation", icon: HelpCircle },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between shrink-0 shadow-sm">
      <div className="space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider px-3 mb-2">
              {group.group}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-all text-left ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isActive 
                          ? 'bg-emerald-200/60 text-emerald-800' 
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-600 text-center">
        Beyond The Resume v2.0 • Light Theme
      </div>
    </aside>
  );
}
