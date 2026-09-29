import React, { useState, useEffect } from 'react';
import { careerApi } from '../services/api';
import { 
  Target, ArrowRight, CheckCircle2, AlertCircle, 
  BookOpen, Sparkles, Layers, ShieldCheck
} from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip
} from 'recharts';

export default function SkillGapPage({ setActivePage }) {
  const [targetRole, setTargetRole] = useState("Full Stack Developer");
  const [gapData, setGapData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkillGap();
  }, [targetRole]);

  const loadSkillGap = async () => {
    try {
      setLoading(true);
      const data = await careerApi.getSkillGap(targetRole);
      setGapData(data);
    } catch (e) {
      console.error("Error loading skill gap:", e);
    } finally {
      setLoading(false);
    }
  };

  const radarData = gapData?.radar_data || [
    { subject: "Architecture", Current: 65, Required: 85 },
    { subject: "Core Coding", Current: 78, Required: 88 },
    { subject: "Databases", Current: 70, Required: 80 },
    { subject: "Deployment", Current: 55, Required: 75 },
    { subject: "Testing", Current: 60, Required: 80 },
    { subject: "Specialization", Current: 68, Required: 85 }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>Target Competency Breakdown</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Skill Gap Matrix & Radar
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Compare your current verified skills against strict role competencies to systematically eliminate interview bottlenecks.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="w-full sm:w-64">
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Target Career Role
          </label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs"
          >
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Software Developer (Core Backend)">Software Developer (Core Backend)</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
            <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
            <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
            <option value="Data Analyst">Data Analyst</option>
          </select>
        </div>
      </div>

      {/* Radar vs Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Radar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Target Competency Radar Comparison</h3>
              <p className="text-xs text-slate-700">Green = Your Verified Level • Blue = Role Industry Benchmark</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
              Gap: {gapData?.overall_gap_percentage || 28}%
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                <Radar name="Current Skills" dataKey="Current" stroke="#059669" fill="#10b981" fillOpacity={0.4} />
                <Radar name="Role Benchmark" dataKey="Required" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.15} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase">Immediate Strategy</span>
            <h3 className="font-extrabold text-slate-900 text-lg mt-1">Recommended Learning Sequence</h3>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              Based on empirical interview question frequencies for <strong>{targetRole}</strong>, prioritize closing Critical Foundation gaps before tackling Advanced Specialization topics.
            </p>

            <div className="mt-4 space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-900 block">Step 1: Core Foundation (Next 14 Days)</span>
                <span className="text-[11px] text-slate-600">Close missing items marked with Critical priority.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-900 block">Step 2: Portfolio Capstone</span>
                <span className="text-[11px] text-slate-600">Combine 2 new skills inside an end-to-end deployed project.</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActivePage('roadmap')}
            className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Execute Personalized Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Skills Matrix Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-extrabold text-slate-900 text-base mb-1">
          Detailed Competency Matrix for {targetRole}
        </h3>
        <p className="text-xs text-slate-700 mb-4">
          Status is determined by comparing your profile and extracted resume against standardized skill dictionaries.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Skill Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Importance</th>
                <th className="p-3">Current Status</th>
                <th className="p-3">Recommended Learning Action</th>
                <th className="p-3">Suggested Resource</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {gapData?.skills?.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{item.skill_name}</td>
                  <td className="p-3 text-slate-600">{item.category}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.importance === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.importance}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${
                      item.current_status === 'Mastered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.current_status === 'Developing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.current_status === 'Mastered' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {item.current_status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700">{item.recommended_action}</td>
                  <td className="p-3 font-semibold text-indigo-700">{item.learning_resource}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
