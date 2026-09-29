import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { predictionsApi, careerApi, profileApi } from '../services/api';
import {
  Compass, ArrowRight, CheckCircle2, TrendingUp, Target, 
  MapPin, Award, Mic, FileText, BrainCircuit, AlertTriangle,
  Sparkles, Layers, ShieldCheck, Clock, BookOpen, ChevronRight
} from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

export default function StudentDashboard({ setActivePage }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [nextMoves, setNextMoves] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [roadmap, setRoadmap] = useState(null);
  const [activeTab, setActiveTab] = useState('insights'); // 'insights' | 'dna' | 'actions'

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [ovData, movesData, recsData, rmData] = await Promise.all([
        predictionsApi.getOverview().catch(() => null),
        careerApi.getNextThreeMoves().catch(() => ({ moves: [] })),
        careerApi.getRecommendations().catch(() => []),
        careerApi.getRoadmap().catch(() => null)
      ]);

      setOverview(ovData);
      setNextMoves(movesData?.moves || []);
      setRecommendations(recsData || []);
      setRoadmap(rmData);
    } catch (err) {
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  // Radar data format from readiness DNA
  const radarData = overview?.placement?.readiness_dna 
    ? Object.entries(overview.placement.readiness_dna).map(([key, value]) => ({
        subject: key,
        score: value,
        fullMark: 100
      }))
    : [
        { subject: "Technical Mastery", score: 85, fullMark: 100 },
        { subject: "Analytical Aptitude", score: 78, fullMark: 100 },
        { subject: "Communication", score: 75, fullMark: 100 },
        { subject: "Project Velocity", score: 82, fullMark: 100 },
        { subject: "Industry Exposure", score: 65, fullMark: 100 },
        { subject: "Resume Polish", score: 80, fullMark: 100 }
      ];

  const skillDistributionData = [
    { name: 'Core DSA', current: 82, benchmark: 85 },
    { name: 'Full-Stack', current: 88, benchmark: 75 },
    { name: 'System Design', current: 65, benchmark: 80 },
    { name: 'Databases', current: 78, benchmark: 80 },
    { name: 'Cloud & DevOps', current: 60, benchmark: 75 },
  ];

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-sm font-semibold text-slate-700">Assembling your Career Intelligence Command Center...</p>
      </div>
    );
  }

  const placementProb = overview?.placement?.placement_probability != null 
    ? Math.round(overview.placement.placement_probability * 100) 
    : 82;
  const salaryLpa = overview?.salary?.estimated_salary_lpa || 11.8;
  const clusterLabel = overview?.cluster?.archetype || "Technically Strong";
  const preferredRole = overview?.preferred_role || "Full Stack Developer";

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* 1. TOP AREA: Personalized Welcome & Profile Completion Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {user?.full_name || 'Scholar'}!
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Active Candidate
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700">
            Targeting <span className="font-bold text-slate-900">{preferredRole}</span> • Cohort Cluster: <span className="font-bold text-purple-700">{clusterLabel}</span>
          </p>
        </div>

        {/* Profile Completion Ring & Quick Actions */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
            <div className="text-right">
              <div className="text-[11px] font-bold text-slate-600 uppercase">Profile Integrity</div>
              <div className="text-sm font-extrabold text-emerald-600">85% Complete</div>
            </div>
            <div className="w-9 h-9 rounded-full border-2 border-emerald-500 flex items-center justify-center font-bold text-xs text-emerald-700 bg-emerald-50">
              85%
            </div>
          </div>

          <button
            onClick={() => setActivePage('resume')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Upload Resume</span>
          </button>

          <button
            onClick={() => setActivePage('interview')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-xs flex items-center gap-2 transition-all"
          >
            <Mic className="w-4 h-4 text-indigo-600" />
            <span>Mock Interview</span>
          </button>
        </div>
      </div>

      {/* 2. KEY METRICS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase mb-1">
            <span>Readiness</span>
            <Compass className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{overview?.scores?.career_readiness || 84}/100</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">High Readiness Tier</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase mb-1">
            <span>Resume ATS</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{overview?.scores?.resume_score || 80}/100</div>
          <div className="text-[10px] text-slate-600 font-medium mt-1">6 Sections Verified</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase mb-1">
            <span>Coding Score</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{overview?.scores?.coding_score || 82}/100</div>
          <div className="text-[10px] text-indigo-600 font-bold mt-1">Top 15% in Cohort</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase mb-1">
            <span>Placement Prob</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">{placementProb}%</div>
          <div className="text-[10px] text-slate-600 font-medium mt-1">Random Forest Pred</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase mb-1">
            <span>Est. Salary</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">₹{salaryLpa}</div>
          <div className="text-[10px] text-slate-600 font-medium mt-1">LPA Projected Band</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-600 text-xs font-bold uppercase mb-1">
            <span>Roadmap</span>
            <MapPin className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{roadmap?.progress_percentage || 20}%</div>
          <div className="text-[10px] text-purple-600 font-bold mt-1">Stage 2 in progress</div>
        </div>

      </div>

      {/* DASHBOARD TABS SWITCHER */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('insights')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'insights'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Primary Intelligence & Radar
        </button>
        <button
          onClick={() => setActiveTab('dna')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'dna'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Readiness DNA & Compass
        </button>
        <button
          onClick={() => setActiveTab('actions')}
          className={`pb-3 transition-colors border-b-2 ${
            activeTab === 'actions'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Your Next 3 Moves & Projects
        </button>
      </div>

      {/* TAB 1: PRIMARY INTELLIGENCE & RADAR */}
      {activeTab === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Readiness Radar Chart */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-600" />
                  Readiness DNA Multi-Axis Radar
                </h3>
                <p className="text-xs text-slate-700 mt-0.5">
                  Visual mapping of technical competencies, academic foundation, projects, and soft skill evidence
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200">
                Balanced Profile
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                  <Radar name="Readiness" dataKey="score" stroke="#059669" fill="#10b981" fillOpacity={0.45} />
                  <Tooltip formatter={(value) => [`${value}/100`, 'Score']} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Radar Insights Footer */}
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <span className="text-slate-600 block">Strongest Pillar</span>
                <span className="font-extrabold text-emerald-700">Technical Mastery (85%)</span>
              </div>
              <div>
                <span className="text-slate-600 block">Primary Opportunity</span>
                <span className="font-extrabold text-indigo-700">Industry Exposure (65%)</span>
              </div>
              <div>
                <span className="text-slate-600 block">Assessment Validity</span>
                <span className="font-extrabold text-slate-800">Verified Evidence</span>
              </div>
            </div>
          </div>

          {/* Explain My Result & Prediction Summary Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">
                <BrainCircuit className="w-4 h-4 text-indigo-600" />
                <span>Explainable Prediction</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Why was this predicted?
              </h3>
              <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                {overview?.placement?.explanation || "Your combination of project experience and coding benchmark provides strong positive signals."}
              </p>

              <div className="mt-4 space-y-2.5">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">Key Influencing Factors:</div>
                {overview?.placement?.contributing_factors?.slice(0, 4).map((f, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-700">{f.factor}</span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      f.impact.includes('Positive') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {f.impact} ({f.weight})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">Model: Random Forest Ensemble</span>
              <button
                onClick={() => setActivePage('placement')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                Inspect All Models <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: READINESS DNA & CAREER COMPASS */}
      {activeTab === 'dna' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Career Compass: Recommended Roles */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                Career Compass (Role Matches)
              </h3>
              <button
                onClick={() => setActivePage('recommendations')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recommendations.slice(0, 3).map((role, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-emerald-300 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-slate-900 text-sm">{role.role_name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {role.match_score}% Match
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">{role.why_recommended}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {role.matching_skills.slice(0, 4).map((s, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-semibold px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gap Benchmark Heatmap */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                Skill Gap Benchmark Heatmap
              </h3>
              <button
                onClick={() => setActivePage('skill-gap')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                Detailed Gaps
              </button>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillDistributionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#334155' }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#0f172a', fontWeight: 600 }} width={90} />
                  <Tooltip />
                  <Bar dataKey="current" fill="#059669" name="Your Level" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="benchmark" fill="#cbd5e1" name="Role Benchmark" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: YOUR NEXT 3 MOVES & RECOMMENDED PROJECTS */}
      {activeTab === 'actions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Your Next 3 Moves */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Your Next 3 Moves
                </h3>
                <p className="text-xs text-slate-700 mt-0.5">
                  Algorithmically prioritized actions calibrated to maximize your immediate placement probability
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {nextMoves.map((move, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-white border border-slate-200 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {move.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-sm">{move.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {move.impact}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">{move.description}</p>
                    <div className="mt-2 text-[10px] font-semibold text-slate-600 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Target: {move.timeline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Capstone Projects */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-extrabold text-slate-900 text-base mb-1 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Recommended Projects
            </h3>
            <p className="text-xs text-slate-700 mb-4">
              High-signal projects that directly validate missing {preferredRole} skills
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Production Capstone</span>
                <h4 className="font-bold text-slate-900 text-xs mt-0.5">Real-time Task Worker with Redis Queue</h4>
                <p className="text-[11px] text-slate-600 mt-1">Dockerized FastAPI worker demonstrating asynchronous background processing.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-indigo-700 uppercase">Full-Stack SaaS</span>
                <h4 className="font-bold text-slate-900 text-xs mt-0.5">Collaborative Workspace with WebSocket Sync</h4>
                <p className="text-[11px] text-slate-600 mt-1">Multi-user real-time state synchronization with PostgreSQL row-level locks.</p>
              </div>
            </div>

            <button
              onClick={() => setActivePage('roadmap')}
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Explore Complete Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* 3. GROWTH TIMELINE & INTERVIEW PULSE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Growth Timeline */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Growth Timeline
            </h3>
            <span className="text-xs text-slate-600">3 milestones achieved</span>
          </div>

          <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
            <div className="relative flex items-start gap-4 pl-8">
              <div className="absolute left-2 w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-emerald-50"></div>
              <div>
                <span className="text-[10px] font-bold text-emerald-700">Completed Milestone</span>
                <h4 className="font-bold text-slate-900 text-xs">Stage 1: Engineering Foundations Cleared</h4>
                <p className="text-[11px] text-slate-600">Mastered Arrays, Hash Maps, and Binary Search algorithms.</p>
              </div>
            </div>

            <div className="relative flex items-start gap-4 pl-8">
              <div className="absolute left-2 w-3.5 h-3.5 rounded-full bg-indigo-600 ring-4 ring-indigo-50"></div>
              <div>
                <span className="text-[10px] font-bold text-indigo-700">In Progress</span>
                <h4 className="font-bold text-slate-900 text-xs">Stage 2: Core Development Stack & REST APIs</h4>
                <p className="text-[11px] text-slate-600">Building microservice endpoints with SQL optimization.</p>
              </div>
            </div>

            <div className="relative flex items-start gap-4 pl-8">
              <div className="absolute left-2 w-3.5 h-3.5 rounded-full bg-slate-300"></div>
              <div>
                <span className="text-[10px] font-bold text-slate-600">Upcoming</span>
                <h4 className="font-bold text-slate-600 text-xs">Stage 3: Cloud Deployment & Mock Interviews</h4>
                <p className="text-[11px] text-slate-600">Scheduled for month 2 of preparation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interview Pulse */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Mic className="w-5 h-5 text-emerald-600" />
                Interview Pulse & STAR Readiness
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                80/100 Fluency
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              Your technical articulation is strong. You currently excel at structuring code explanations, but behavioral responses would benefit from tighter adherence to the STAR framework (Situation, Task, Action, Result).
            </p>

            <div className="mt-4 p-3 bg-emerald-50/50 rounded-xl border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Recommended STAR Practice</span>
              <p className="text-xs text-slate-800 font-semibold mt-0.5">
                "Describe a difficult technical bug or team disagreement you resolved."
              </p>
            </div>
          </div>

          <button
            onClick={() => setActivePage('interview')}
            className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <span>Launch Interactive Mock Interview</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
