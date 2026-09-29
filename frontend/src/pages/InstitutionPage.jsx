import React, { useState, useEffect } from 'react';
import { institutionApi } from '../services/api';
import { 
  GraduationCap, TrendingUp, Users, AlertTriangle, 
  BarChart2, Download, Building2, CheckCircle2, ArrowRight
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';

export default function InstitutionPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInstitutionData();
  }, []);

  const loadInstitutionData = async () => {
    try {
      setLoading(true);
      const data = await institutionApi.getAnalytics();
      setAnalytics(data);
    } catch (e) {
      console.error("Institution analytics error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = () => {
    if (!analytics) return;
    const jsonStr = JSON.stringify(analytics, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Institutional_Placement_Readiness_Report_2026.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const overview = analytics?.overview || {};
  const departmentMetrics = analytics?.department_metrics || [];
  const readinessDistribution = analytics?.readiness_distribution || [];
  const atRiskList = analytics?.at_risk_students || [];
  const trainingNeeds = analytics?.training_needs || [];

  const COLORS = ['#f43f5e', '#f59e0b', '#3b82f6', '#10b981'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold mb-2 border border-purple-200">
            <Building2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Institutional Placement Cell Dashboard</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Institutional Placement & Cohort Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Aggregated institutional analytics, department-wise readiness benchmarks, and early-warning support tracking.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Anonymized Audit Report</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase">Total Enrolled</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {overview.total_students_enrolled || 25000}
          </div>
          <span className="text-[10px] text-slate-600">Active Cohort Records</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase">Placement Ready</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">
            {overview.overall_placement_rate || "67.8%"}
          </div>
          <span className="text-[10px] text-emerald-700 font-bold">Historical Cohort Parity</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase">Average Readiness</span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1">
            {overview.avg_readiness_index || 74.2}/100
          </div>
          <span className="text-[10px] text-slate-600">Multi-factor Composite</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase">Projected Avg Salary</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {overview.avg_projected_salary_lpa || "₹11.8 LPA"}
          </div>
          <span className="text-[10px] text-slate-600">Regression Forecast</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-600 uppercase">Need Intervention</span>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">
            {overview.students_requiring_intervention || 1840}
          </div>
          <span className="text-[10px] text-rose-700 font-bold">Early Warning Flag</span>
        </div>

      </div>

      {/* Department Breakdown & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department Placement Performance Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="font-extrabold text-slate-900 text-sm mb-1">
            Department-wise Placement Readiness Comparison
          </h3>
          <p className="text-xs text-slate-700 mb-4">
            Cross-departmental percentage of students currently tracking in the Placement-Ready zone.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="department" tick={{ fontSize: 10, fill: '#334155' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#334155' }} />
                <Tooltip />
                <Bar dataKey="placement_rate" fill="#059669" name="Placement Rate (%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avg_readiness" fill="#6366f1" name="Avg Readiness Score" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Readiness Distribution Brackets */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm mb-1">Readiness Brackets</h3>
            <p className="text-xs text-slate-700 mb-4">Cohort breakdown by talent readiness tier</p>

            <div className="space-y-3">
              {readinessDistribution.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">{item.bracket}</span>
                    <span className="text-[11px] text-slate-500">{item.count.toLocaleString()} students</span>
                  </div>
                  <span className="font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* At-Risk Students Requiring Intervention */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              Early Intervention Registry (Students Needing Academic / Skill Support)
            </h3>
            <p className="text-xs text-slate-700 mt-0.5">
              Identified by composite readiness below 45 or active backlogs. Privacy-preserving anonymized IDs.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Candidate Identifier</th>
                <th className="p-3">Department</th>
                <th className="p-3">CGPA</th>
                <th className="p-3">Backlogs</th>
                <th className="p-3">Readiness Score</th>
                <th className="p-3">Coding Benchmark</th>
                <th className="p-3">Recommended Faculty Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {atRiskList.map((st, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="p-3 font-extrabold text-slate-900">{st.student_id}</td>
                  <td className="p-3 text-slate-600">{st.department}</td>
                  <td className="p-3 text-rose-600 font-bold">{st.cgpa}</td>
                  <td className="p-3 font-bold text-rose-700">{st.backlogs} Backlogs</td>
                  <td className="p-3 font-extrabold text-rose-600">{st.readiness_score}/100</td>
                  <td className="p-3 text-slate-700">{st.coding_score}/100</td>
                  <td className="p-3 text-slate-700 font-medium">{st.recommended_intervention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Curriculum Training Needs */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">
          Curriculum Alignment & Institutional Training Needs
        </h3>
        <p className="text-xs text-slate-700">
          Synthesized by aggregating common assessment errors and skill gap matrices across all department students.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trainingNeeds.map((tn, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-purple-700 uppercase">Intervention Area #{idx + 1}</span>
              <h4 className="font-extrabold text-slate-900 text-xs">{tn.skill_area}</h4>
              <p className="text-xs text-rose-700 font-semibold">{tn.cohort_deficiency}</p>
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600">
                <strong>Action: </strong>{tn.recommended_action}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
