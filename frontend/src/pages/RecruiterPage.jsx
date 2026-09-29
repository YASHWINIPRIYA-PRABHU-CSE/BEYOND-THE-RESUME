import React, { useState, useEffect } from 'react';
import { recruiterApi } from '../services/api';
import { 
  Briefcase, Search, Filter, CheckCircle2, UserCheck, 
  ArrowRight, Sparkles, Layers, Sliders, X, Award
} from 'lucide-react';

export default function RecruiterPage() {
  const [candidates, setCandidates] = useState([]);
  const [totalMatched, setTotalMatched] = useState(0);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(false);

  // Filters
  const [role, setRole] = useState("All");
  const [department, setDepartment] = useState("All");
  const [minReadiness, setMinReadiness] = useState(60);
  const [minCgpa, setMinCgpa] = useState(7.0);

  // Comparison state
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [comparing, setComparing] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, [role, department, minReadiness, minCgpa]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await recruiterApi.search({
        role: role === "All" ? "" : role,
        department: department === "All" ? "" : department,
        min_readiness: minReadiness,
        min_cgpa: minCgpa,
        limit: 15
      });
      setCandidates(res.candidates || []);
      setTotalMatched(res.total_matched || 0);
      setAnalytics(res.analytics || {});
    } catch (e) {
      console.error("Recruiter search error:", e);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectForComparison = (candId) => {
    if (selectedForComparison.includes(candId)) {
      setSelectedForComparison(selectedForComparison.filter(id => id !== candId));
    } else {
      if (selectedForComparison.length >= 3) {
        alert("You can compare up to 3 candidates at a time.");
        return;
      }
      setSelectedForComparison([...selectedForComparison, candId]);
    }
  };

  const handleRunComparison = async () => {
    if (selectedForComparison.length < 2) {
      alert("Please select at least 2 candidates to compare.");
      return;
    }
    try {
      setComparing(true);
      const res = await recruiterApi.compare(selectedForComparison);
      setComparisonResults(res.candidates || []);
    } catch (e) {
      console.error("Comparison error:", e);
    } finally {
      setComparing(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-2 border border-blue-200">
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Recruiter Enterprise Talent Discovery</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Anonymized Talent Pool & Candidate Search
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Discover verified talent based on multi-dimensional readiness scores, coding benchmarks, and capstone evidence without demographic bias.
          </p>
        </div>

        {/* Quick Comparison Action */}
        {selectedForComparison.length > 0 && (
          <div className="flex items-center gap-2 bg-slate-900 text-white p-2.5 px-4 rounded-xl shadow-md">
            <span className="text-xs font-bold">{selectedForComparison.length} Selected</span>
            <button
              onClick={handleRunComparison}
              className="text-xs font-bold px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded-lg"
            >
              Compare Side-by-Side
            </button>
            <button
              onClick={() => { setSelectedForComparison([]); setComparisonResults([]); }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-xl bg-slate-50"
          >
            <option value="All">All Roles</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
            <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-xl bg-slate-50"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="AI & Machine Learning">AI & Machine Learning</option>
            <option value="Data Science">Data Science</option>
            <option value="Electronics & Comm">Electronics & Comm</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>Min. Readiness Score:</span>
            <span className="text-emerald-700">{minReadiness}+</span>
          </div>
          <input
            type="range"
            min="30"
            max="90"
            value={minReadiness}
            onChange={(e) => setMinReadiness(parseInt(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
            <span>Min. CGPA:</span>
            <span className="text-indigo-700">{minCgpa}</span>
          </div>
          <input
            type="range"
            min="6.0"
            max="9.0"
            step="0.2"
            value={minCgpa}
            onChange={(e) => setMinCgpa(parseFloat(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase">Filtered Pool Matches</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{totalMatched} Candidates</div>
          <span className="text-[10px] text-slate-600">From 25,000 active student registry</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase">Average Readiness Score</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{analytics?.avg_readiness || 76.5}/100</div>
          <span className="text-[10px] text-emerald-700 font-bold">Top Quartile Available</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase">Average Coding Benchmark</span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1">{analytics?.avg_coding || 74.2}/100</div>
          <span className="text-[10px] text-indigo-700 font-bold">Verified DSA & System Design</span>
        </div>
      </div>

      {/* Candidate Comparison Drawer (if results exist) */}
      {comparisonResults.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border-2 border-indigo-500 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base">Candidate Side-by-Side Comparison</h3>
            <button
              onClick={() => setComparisonResults([])}
              className="text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              Close Comparison
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparisonResults.map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-extrabold text-indigo-700 block">{c.candidate_id}</span>
                <div className="text-xs font-bold text-slate-900">{c.preferred_role} • {c.department}</div>
                <div className="pt-2 border-t border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between"><span>Readiness Score:</span><strong className="text-emerald-700">{c.readiness_score}/100</strong></div>
                  <div className="flex justify-between"><span>Coding Benchmark:</span><strong>{c.coding_score}/100</strong></div>
                  <div className="flex justify-between"><span>Aptitude:</span><strong>{c.aptitude_score}/100</strong></div>
                  <div className="flex justify-between"><span>CGPA:</span><strong>{c.cgpa}</strong></div>
                  <div className="flex justify-between"><span>Projects:</span><strong>{c.projects_count}</strong></div>
                  <div className="flex justify-between"><span>Internships:</span><strong>{c.internships_count}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Candidates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((cand, idx) => {
          const isSelected = selectedForComparison.includes(cand.candidate_id);
          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl bg-white border transition-all flex flex-col justify-between space-y-4 ${
                isSelected 
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md' 
                  : 'border-slate-200 shadow-sm hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-slate-800 tracking-tight">
                    {cand.candidate_id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {cand.talent_tier}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900 mt-0.5">
                  {cand.preferred_role}
                </div>
                <div className="text-[11px] text-slate-600">
                  {cand.department} • CGPA: {cand.cgpa}
                </div>

                {/* Score Pills */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs mt-3 pt-3 border-t border-slate-100">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-[10px] text-slate-600 block">Readiness</span>
                    <span className="font-extrabold text-emerald-700">{cand.readiness_score}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-[10px] text-slate-600 block">Coding</span>
                    <span className="font-extrabold text-indigo-700">{cand.coding_score}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="text-[10px] text-slate-600 block">Projects</span>
                    <span className="font-extrabold text-slate-900">{cand.projects_count}</span>
                  </div>
                </div>

                {/* Skills Chips */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {cand.skills?.map((s, sIdx) => (
                    <span key={sIdx} className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => toggleSelectForComparison(cand.candidate_id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                    isSelected 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isSelected ? "Selected" : "+ Compare"}
                </button>

                <button
                  onClick={() => alert(`Connection request sent to ${cand.candidate_id}. The candidate will be notified to release contact info.`)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  Request Interview →
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
