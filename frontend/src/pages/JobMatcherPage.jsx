import React, { useState } from 'react';
import { resumeApi } from '../services/api';
import { 
  Briefcase, Sparkles, CheckCircle2, AlertCircle, 
  ArrowRight, Search, FileText, Layers, Tag
} from 'lucide-react';

export default function JobMatcherPage() {
  const [jobDescription, setJobDescription] = useState(`We are seeking an ambitious Full Stack Developer to build cloud-native applications.
Requirements:
- Strong hands-on proficiency in JavaScript, TypeScript, React, and Node.js
- Experience with PostgreSQL database design, REST APIs, and Docker containerization
- Familiarity with CI/CD pipelines, Git, and Linux
- Knowledge of Data Structures, Algorithms, and System Design is an added advantage.`);
  
  const [targetRole, setTargetRole] = useState("Full Stack Developer");
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    try {
      setLoading(true);
      const res = await resumeApi.matchJd({
        target_role: targetRole,
        job_description: jobDescription
      });
      setMatchResult(res);
    } catch (e) {
      console.error("Error matching job description:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            <span>TF-IDF Semantic Matching</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Job Role Matcher & Tailoring Tool
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Paste any job posting or requirement text to evaluate candidate alignment, extract hidden keywords, and receive tailored application advice.
          </p>
        </div>
      </div>

      {/* Input Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Job Description Textbox */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase">
              Job Description / Posting Text:
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1 border border-slate-200 rounded-lg bg-slate-50"
            >
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Software Developer">Software Developer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Machine Learning Engineer">Machine Learning Engineer</option>
              <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
            </select>
          </div>

          <textarea
            rows={10}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste raw job description here..."
            className="w-full text-xs font-medium p-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />

          <button
            onClick={handleMatch}
            disabled={loading || !jobDescription.trim()}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Compute Alignment Match</span>
          </button>
        </div>

        {/* Match Results */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Alignment Intelligence & Compatibility
            </h3>

            {matchResult ? (
              <div className="mt-4 space-y-5">
                
                {/* Score Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase">Match Score</span>
                    <div className="text-3xl font-extrabold text-emerald-700 mt-0.5">
                      {matchResult.match_percentage}%
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{matchResult.verdict}</span>
                  </div>

                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500 bg-white flex items-center justify-center font-extrabold text-xs text-emerald-800">
                    {matchResult.match_percentage}%
                  </div>
                </div>

                {/* Matching Skills */}
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Matching Skills Identified ({matchResult.matching_skills?.length}):
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.matching_skills?.map((s, idx) => (
                      <span key={idx} className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                {matchResult.missing_skills?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-rose-800 uppercase flex items-center gap-1.5 mb-2">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      Missing High-Impact Requirements ({matchResult.missing_skills?.length}):
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {matchResult.missing_skills?.map((s, idx) => (
                        <span key={idx} className="text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-lg">
                          + {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tailoring Recommendations */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Application Tailoring Tips:</h4>
                  <div className="space-y-1.5">
                    {matchResult.recommended_improvements?.map((tip, idx) => (
                      <div key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-20 text-center text-slate-400 space-y-2">
                <Briefcase className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-semibold">Paste a job description and click 'Compute Alignment'</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
            Uses TF-IDF Vectorization and Cosine Similarity against standard skill taxonomies.
          </div>

        </div>

      </div>

    </div>
  );
}
