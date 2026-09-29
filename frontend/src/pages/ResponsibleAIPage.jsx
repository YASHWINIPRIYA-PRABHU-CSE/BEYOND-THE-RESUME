import React, { useState, useEffect } from 'react';
import { mlInsightsApi } from '../services/api';
import { 
  ShieldAlert, CheckCircle2, AlertTriangle, Lock, 
  Eye, FileText, HeartHandshake, Sparkles, Scale
} from 'lucide-react';

export default function ResponsibleAIPage() {
  const [audit, setAudit] = useState(null);

  useEffect(() => {
    loadAudit();
  }, []);

  const loadAudit = async () => {
    try {
      const data = await mlInsightsApi.getResponsibleAI();
      setAudit(data);
    } catch (e) {
      console.warn("Could not load responsible AI data:", e);
    }
  };

  const departmentalParity = audit?.departmental_parity || {
    "Computer Science": { placement_rate: 0.69 },
    "Information Technology": { placement_rate: 0.67 },
    "AI & Machine Learning": { placement_rate: 0.68 },
    "Data Science": { placement_rate: 0.65 },
    "Electronics & Comm": { placement_rate: 0.58 },
    "Electrical Engineering": { placement_rate: 0.54 }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <Scale className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Ethics, Privacy & Governance Framework</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Responsible AI & Data Privacy Charter
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Our explicit commitments regarding synthetic benchmark datasets, algorithmic fairness, explainability, and student privacy.
          </p>
        </div>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Transparent Benchmark Data Disclosure</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            The platform is trained on a synthetic 25,000-student cohort calibrated to empirical placement distributions. <strong>We never claim synthetic data represents real students without consent.</strong> The system is designed as an educational career intelligence tool to guide growth, not a final gatekeeper.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Candidate Privacy & Anonymization</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Recruiter talent pools display anonymized candidate tags (e.g. <code>Talent-BTR-10492</code>). Personal contact information, addresses, and demographic details are withheld to prevent unconscious screening bias until candidates explicitly approve reciprocal contact.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Explainability & Feature Attributions</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            No prediction is a black box. Every placement probability and salary projection displays its contributing factors (e.g. project depth, DSA proficiency) so students understand <em>why</em> an estimate was generated and <em>how</em> to improve it.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Non-Deterministic Guidance</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Placement readiness and salary estimates are statistical forecasts reflecting market trends. They do not constitute guaranteed job offers or compensation commitments, as interview day dynamics carry situational variance.
          </p>
        </div>

      </div>

      {/* Fairness & Demographic Parity Audit Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">
          Departmental Parity & Bias Monitoring
        </h3>
        <p className="text-xs text-slate-700">
          We monitor model predictions across different academic streams to verify that non-CS candidates who demonstrate software skills are evaluated fairly.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(departmentalParity).map(([dept, data], idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] font-bold text-slate-700 block truncate">{dept}</span>
              <div className="text-lg font-extrabold text-emerald-700 mt-1">
                {(data.placement_rate * 100).toFixed(0)}%
              </div>
              <span className="text-[10px] text-slate-600 font-medium">Placement Rate</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
