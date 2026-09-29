import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { profileApi } from '../services/api';
import { 
  User, CheckCircle2, Save, Sparkles, Building2, 
  GraduationCap, Briefcase, Award, Code, RefreshCw
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await profileApi.get();
      setProfile(data);
    } catch (e) {
      console.error("Error loading profile:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const updated = await profileApi.update(profile);
      setProfile(updated);
      setSuccessMessage("Profile saved successfully! Completion score updated.");
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (e) {
      console.error("Error saving profile:", e);
    } finally {
      setSaving(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-slate-700">Loading student profile...</p>
      </div>
    );
  }

  const completionPct = profile?.completion_percentage || 85;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <User className="w-3.5 h-3.5 text-emerald-600" />
            <span>Candidate Dossier & Credentials</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Student Profile & Background
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Maintain your verified academic, technical, project, and career preferences used by prediction models.
          </p>
        </div>

        {/* Completion Indicator */}
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-600 uppercase block">Integrity Score</span>
            <span className="text-base font-extrabold text-emerald-700">{completionPct}% Complete</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-emerald-500 bg-white flex items-center justify-center font-extrabold text-xs text-emerald-800">
            {completionPct}%
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Academic Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            Academic Foundation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department</label>
              <select
                value={profile?.department || "Computer Science"}
                onChange={(e) => handleChange("department", e.target.value)}
                className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-xl bg-slate-50"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Data Science">Data Science</option>
                <option value="Electronics & Comm">Electronics & Comm</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Year of Study</label>
              <select
                value={profile?.year_of_study || "Final Year"}
                onChange={(e) => handleChange("year_of_study", e.target.value)}
                className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-xl bg-slate-50"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year (Pre-Final)">3rd Year (Pre-Final)</option>
                <option value="Final Year">Final Year</option>
                <option value="Recent Graduate">Recent Graduate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cumulative CGPA</label>
              <input
                type="number"
                step="0.01"
                min="5.0"
                max="10.0"
                value={profile?.cgpa || 7.8}
                onChange={(e) => handleChange("cgpa", parseFloat(e.target.value))}
                className="w-full text-xs font-bold p-2.5 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Active Backlogs</label>
              <select
                value={profile?.backlogs ?? 0}
                onChange={(e) => handleChange("backlogs", parseInt(e.target.value))}
                className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-xl bg-slate-50"
              >
                <option value="0">0 (Cleared)</option>
                <option value="1">1 Backlog</option>
                <option value="2">2 Backlogs</option>
                <option value="3">3+ Backlogs</option>
              </select>
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
            <Code className="w-5 h-5 text-indigo-600" />
            Technical Competencies & Tools
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Core Programming Languages (comma separated)
              </label>
              <input
                type="text"
                value={profile?.technical_skills || ""}
                onChange={(e) => handleChange("technical_skills", e.target.value)}
                placeholder="Python, Java, TypeScript, SQL..."
                className="w-full text-xs font-medium p-2.5 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Frameworks & Libraries
              </label>
              <input
                type="text"
                value={profile?.frameworks || ""}
                onChange={(e) => handleChange("frameworks", e.target.value)}
                placeholder="React, FastAPI, Node.js, Scikit-Learn..."
                className="w-full text-xs font-medium p-2.5 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Databases & Storage
              </label>
              <input
                type="text"
                value={profile?.databases || ""}
                onChange={(e) => handleChange("databases", e.target.value)}
                placeholder="PostgreSQL, MongoDB, Redis, SQLite..."
                className="w-full text-xs font-medium p-2.5 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Cloud, DevOps & Tools
              </label>
              <input
                type="text"
                value={profile?.cloud_tools || ""}
                onChange={(e) => handleChange("cloud_tools", e.target.value)}
                placeholder="AWS, Docker, Linux, Git, GitHub Actions..."
                className="w-full text-xs font-medium p-2.5 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-b border-slate-100 pb-3">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            Career Aspirations & Target Roles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Career Role</label>
              <select
                value={profile?.preferred_role || "Full Stack Developer"}
                onChange={(e) => handleChange("preferred_role", e.target.value)}
                className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-xl bg-slate-50"
              >
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Software Developer">Software Developer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
                <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                <option value="Data Analyst">Data Analyst</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Industry</label>
              <input
                type="text"
                value={profile?.preferred_industry || "Enterprise SaaS & Fintech"}
                onChange={(e) => handleChange("preferred_industry", e.target.value)}
                className="w-full text-xs font-medium p-2.5 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Target Companies</label>
              <input
                type="text"
                value={profile?.target_companies || "Microsoft, Stripe, Razorpay, Google"}
                onChange={(e) => handleChange("target_companies", e.target.value)}
                className="w-full text-xs font-medium p-2.5 border border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-all"
          >
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving Profile...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
