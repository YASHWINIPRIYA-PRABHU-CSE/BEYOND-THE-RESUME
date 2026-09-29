import React from 'react';
import { 
  Sparkles, Compass, CheckCircle2, ArrowRight, ShieldCheck, 
  BrainCircuit, Users, Building2, TrendingUp, Target, 
  FileText, Zap, Award, Layers
} from 'lucide-react';

export default function LandingPage({ setActivePage }) {
  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Beyond Conventional Keyword Filtering • Explainable AI Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Turn your profile into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">personalized career strategy.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-700 font-medium leading-relaxed">
              “Your resume shows where you are. Your potential shows where you can go.”
            </p>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              A comprehensive AI career intelligence and talent readiness platform engineered for colleges, students, recruiters, and corporate learning teams.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setActivePage('dashboard')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 group transition-all"
              >
                <span>Discover My Career Readiness</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActivePage('model-insights')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <BrainCircuit className="w-4 h-4 text-indigo-600" />
                <span>Explore Explainable ML Models</span>
              </button>
            </div>
          </div>

          {/* Hero Feature Teaser Mockup */}
          <div className="mt-14 max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-premium p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Live Career Intelligence Preview</h3>
                  <p className="text-xs text-slate-600">Simulating real-time profile ingestion and multi-factor readiness evaluation</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                  Model Status: Operational (5 Units Loaded)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Placement Readiness</span>
                <div className="text-2xl font-extrabold text-emerald-600 mt-1">82.4%</div>
                <p className="text-[11px] text-slate-600 mt-1">Random Forest & Logistic Regression verified</p>
              </div>

              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Salary Projection</span>
                <div className="text-2xl font-extrabold text-indigo-600 mt-1">₹11.8 LPA</div>
                <p className="text-[11px] text-slate-600 mt-1">Linear & Gradient Boosting Regression</p>
              </div>

              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Talent Archetype</span>
                <div className="text-lg font-extrabold text-purple-700 mt-1 truncate">Technically Strong</div>
                <p className="text-[11px] text-slate-600 mt-1">Unsupervised K-Means (k=5) + PCA</p>
              </div>

              <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Next Move</span>
                <div className="text-sm font-extrabold text-slate-900 mt-1 truncate">Two-Pointer Sprint</div>
                <p className="text-[11px] text-slate-600 mt-1">+15% Coding Readiness action</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. BEYOND KEYWORD MATCHING SECTION */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Architectural Contrast</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Beyond Conventional Keyword Screening
            </p>
            <p className="mt-3 text-slate-700 text-sm">
              Traditional resume screeners discard candidates based on simple keyword omissions. Beyond The Resume constructs a multi-dimensional talent readiness model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional */}
            <div className="p-6 rounded-2xl bg-rose-50/40 border border-rose-200/80">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-4">
                <ShieldCheck className="w-5 h-5 text-rose-500" />
                <span>Traditional Keyword Screening</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Disqualifies candidates if exact job buzzwords are omitted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Ignores problem-solving capacity, coding scores, and academic velocity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Provides no actionable feedback or learning roadmaps to the applicant.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Treats static history as the sole predictor of future contribution.</span>
                </li>
              </ul>
            </div>

            {/* Beyond The Resume */}
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-4">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>Beyond The Resume Intelligence</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Holistic evaluation across 14 academic, coding, and experience parameters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Explainable ML predictions with transparent feature contribution factors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Generates personalized learning roadmaps and targeted "Your Next 3 Moves".</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Includes interactive mock interviews, quizzes, and recruiter discovery.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 3. MULTI-STAKEHOLDER BENEFITS */}
      <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Ecosystem Impact</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Empowering Every Career Stakeholder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Students & Job Seekers</h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                Receive personalized readiness analysis, discover hidden skill gaps, practice role-specific STAR mock interviews, and follow guided milestones to target dream tech roles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Recruiters & Companies</h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                Filter anonymized talent by verified skill evidence, coding benchmarks, and role compatibility without PII bias. Compare top candidates side-by-side.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">Universities & Placement Cells</h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                Track cohort readiness distributions, identify students needing academic or aptitude intervention early, and adapt training curriculum to market trends.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to explore your complete career potential?
          </h2>
          <p className="mt-4 text-emerald-100 text-sm sm:text-base max-w-xl mx-auto">
            Experience the live Student Dashboard, upload a resume for instant parsing, and interact with all 5 Machine Learning syllabus units.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setActivePage('dashboard')}
              className="px-8 py-3.5 rounded-xl bg-white text-emerald-800 font-extrabold text-sm shadow-lg hover:bg-emerald-50 transition-all"
            >
              Launch Student Dashboard
            </button>
            <button
              onClick={() => setActivePage('recruiter')}
              className="px-8 py-3.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold text-sm border border-emerald-500/40 transition-all"
            >
              Recruiter Talent Pool
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
