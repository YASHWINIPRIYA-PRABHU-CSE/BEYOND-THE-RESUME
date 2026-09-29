import React, { useState, useEffect } from 'react';
import { careerApi } from '../services/api';
import { 
  Compass, Award, ArrowRight, CheckCircle2, AlertCircle, 
  Briefcase, TrendingUp, Sparkles, Layers, BookOpen
} from 'lucide-react';

export default function CareerRecommendationsPage({ setActivePage }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const data = await careerApi.getRecommendations();
      setRecommendations(data);
      if (data.length > 0) setSelectedRole(data[0]);
    } catch (e) {
      console.error("Error loading recommendations:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-slate-700">Synthesizing multi-path career recommendations...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>Multi-Path Career Intelligence</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Target Career Recommendations
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Weighted algorithmic matching comparing your verified skills, project portfolio, and academic performance against industry role benchmarks.
          </p>
        </div>

        <button
          onClick={() => setActivePage('skill-gap')}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>Examine Skill Gaps</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((role, idx) => {
          const isSelected = selectedRole?.role_name === role.role_name;
          return (
            <div
              key={idx}
              onClick={() => setSelectedRole(role)}
              className={`p-6 rounded-2xl bg-white border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Demand: {role.industry_demand}
                  </span>
                  <div className="flex items-center gap-1 font-extrabold text-emerald-700 text-base">
                    <span>{role.match_score}%</span>
                    <span className="text-xs text-slate-600 font-normal">Match</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg">{role.role_name}</h3>
                <span className="text-xs font-bold text-indigo-700">{role.readiness_level}</span>

                <p className="text-xs text-slate-700 mt-2.5 leading-relaxed">
                  {role.why_recommended}
                </p>

                <div className="mt-4">
                  <div className="text-[10px] font-bold text-slate-600 uppercase mb-1.5">Matching Core Skills:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {role.matching_skills.slice(0, 5).map((m, mIdx) => (
                      <span key={mIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {role.missing_skills.length > 0 && (
                  <div className="mt-3">
                    <div className="text-[10px] font-bold text-slate-600 uppercase mb-1.5">Target Skills to Add:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {role.missing_skills.slice(0, 3).map((ms, msIdx) => (
                        <span key={msIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          + {ms}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>{role.typical_salary_range}</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  Inspect Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Role Detailed Drawer */}
      {selectedRole && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Deep Dive Analysis</span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">{selectedRole.role_name} Profile Blueprint</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
                Typical Range: {selectedRole.typical_salary_range}
              </span>
              <button
                onClick={() => setActivePage('interview')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Practice Interview for this Role
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Recommended Capstone Projects</h4>
              <div className="space-y-2.5">
                {selectedRole.suggested_projects?.map((proj, pIdx) => (
                  <div key={pIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{proj}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Next Step in Learning Roadmap</h4>
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-900 leading-relaxed">
                To bridge the remaining {100 - selectedRole.match_score}% gap for <strong>{selectedRole.role_name}</strong>, complete the structured milestone tasks in your personalized learning roadmap.
                <button
                  onClick={() => setActivePage('roadmap')}
                  className="mt-3 block font-bold text-indigo-700 hover:text-indigo-800 underline"
                >
                  Open Learning Roadmap →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
