import React, { useState, useEffect } from 'react';
import { careerApi } from '../services/api';
import { 
  MapPin, CheckCircle2, Circle, Clock, Award, 
  ArrowRight, Sparkles, Layers, Briefcase
} from 'lucide-react';

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoadmap();
  }, []);

  const loadRoadmap = async () => {
    try {
      setLoading(true);
      const data = await careerApi.getRoadmap();
      setRoadmap(data);
    } catch (e) {
      console.error("Error loading roadmap:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (itemId) => {
    try {
      await careerApi.toggleRoadmapItem(itemId);
      // Refresh roadmap
      await loadRoadmap();
    } catch (e) {
      console.error("Error toggling milestone:", e);
    }
  };

  if (loading && !roadmap) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-slate-700">Calibrating personalized career roadmap...</p>
      </div>
    );
  }

  const milestones = roadmap?.milestones || [];
  const progressPct = roadmap?.progress_percentage || 20;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header & Progress Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Multi-Stage Milestone Journey</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Personalized Career Flight Path
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 mt-1">
              Curated for <span className="font-bold text-slate-900">{roadmap?.target_role || "Full Stack Developer"}</span> based on your current skill gaps and verified project portfolio.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-600 uppercase">Roadmap Velocity</span>
            <div className="text-3xl font-extrabold text-emerald-600 mt-0.5">{progressPct}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-600 mt-1.5 font-semibold">
            <span>Stage 1: Foundations</span>
            <span>Stage 3: Capstone Deployment</span>
            <span>Stage 5: Final Interview Prep</span>
          </div>
        </div>
      </div>

      {/* Interactive Milestones Timeline */}
      <div className="space-y-6">
        {milestones.map((item, idx) => (
          <div
            key={item.id}
            className={`p-6 rounded-2xl bg-white border transition-all ${
              item.is_completed 
                ? 'border-emerald-300 bg-emerald-50/20 shadow-xs' 
                : 'border-slate-200 shadow-sm hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              
              <div className="flex items-start gap-4">
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${
                    item.is_completed
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                      : 'border-slate-300 hover:border-emerald-500 bg-white'
                  }`}
                  title={item.is_completed ? "Mark as in-progress" : "Mark as completed"}
                >
                  {item.is_completed && <CheckCircle2 className="w-4 h-4" />}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      {item.stage}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Est. Effort: {item.effort_hours} Hours
                    </span>
                  </div>

                  <h3 className={`text-base font-extrabold mt-1 ${item.is_completed ? 'text-slate-700 line-through' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-700 mt-1 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  {/* Skills tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.skills?.map((s, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Capstone recommendation */}
                  {item.project_recommendation && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="font-bold text-slate-800">Portfolio Project Deliverable: </span>
                      <span className="text-slate-600">{item.project_recommendation}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    item.is_completed
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {item.is_completed ? "Completed" : "Mark Complete"}
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
