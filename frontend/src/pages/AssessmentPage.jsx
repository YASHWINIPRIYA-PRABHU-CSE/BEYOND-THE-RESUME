import React, { useState, useEffect } from 'react';
import { assessmentsApi } from '../services/api';
import { 
  Award, CheckCircle2, XCircle, ArrowRight, RefreshCw, 
  HelpCircle, Sparkles, Layers, ShieldCheck, Clock
} from 'lucide-react';

export default function AssessmentPage() {
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  const [assessmentData, setAssessmentData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      setLoading(true);
      const list = await assessmentsApi.list();
      setAssessments(list);
      if (list.length > 0) {
        selectQuiz(list[0].id);
      }
    } catch (e) {
      console.error("Error loading assessment list:", e);
    } finally {
      setLoading(false);
    }
  };

  const selectQuiz = async (id) => {
    setSelectedAssessmentId(id);
    setResult(null);
    setUserAnswers({});
    try {
      const data = await assessmentsApi.get(id);
      setAssessmentData(data);
    } catch (e) {
      console.error("Error fetching quiz questions:", e);
    }
  };

  const handleOptionSelect = (qId, optionKey) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionKey
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAssessmentId) return;

    try {
      setSubmitting(true);
      const res = await assessmentsApi.submit({
        assessment_id: selectedAssessmentId,
        answers: userAnswers
      });
      setResult(res);
    } catch (e) {
      console.error("Error submitting quiz:", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Talent Credentialing</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Skill Assessments & Evidence Benchmark
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Turn claimed skills into verified recruiter-visible evidence. Benchmarks concepts in Programming, DSA, SQL, and ML.
          </p>
        </div>

        {/* Assessment Category Buttons */}
        <div className="flex flex-wrap gap-2">
          {assessments.map(a => (
            <button
              key={a.id}
              onClick={() => selectQuiz(a.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                selectedAssessmentId === a.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {a.category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Quiz Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Questions List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">{assessmentData?.title}</h2>
              <p className="text-xs text-slate-600 mt-0.5">{assessmentData?.description}</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md border border-slate-200 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {assessmentData?.time_limit_minutes} Min Limit
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {assessmentData?.questions?.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-extrabold text-slate-900">
                    Q{idx + 1}. {q.question_text}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {q.difficulty}
                  </span>
                </div>

                <div className="space-y-2">
                  {['A', 'B', 'C', 'D'].map(optKey => {
                    const optText = q[`option_${optKey.toLowerCase()}`];
                    const isSelected = userAnswers[q.id] === optKey;
                    return (
                      <div
                        key={optKey}
                        onClick={() => handleOptionSelect(q.id, optKey)}
                        className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-extrabold text-[10px] ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {optKey}
                        </span>
                        <span>{optText}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={submitting || Object.keys(userAnswers).length === 0}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Answers & Grading...</span>
                </>
              ) : (
                <>
                  <Award className="w-4 h-4" />
                  <span>Submit Assessment for Verified Credential</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* Right Column: Skill Confidence vs Skill Evidence */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Skill Confidence vs. Evidence
            </h3>

            {result ? (
              <div className="mt-4 space-y-4">
                
                {/* Result Score Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase">Assessment Score</span>
                    <div className="text-3xl font-extrabold text-emerald-700 mt-0.5">
                      {result.score} / {result.total}
                    </div>
                    <span className="text-[11px] text-slate-600">{result.percentage}% Accuracy</span>
                  </div>

                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500 bg-white flex items-center justify-center font-extrabold text-xs text-emerald-800">
                    {result.percentage}%
                  </div>
                </div>

                {/* Evidence Status Callout */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Verification Status:</span>
                    <span className="font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {result.skill_confidence_vs_evidence?.evidence_status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed mt-1">
                    {result.skill_confidence_vs_evidence?.insight}
                  </p>
                </div>

                {/* Question Breakdown */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase">Answer Breakdown:</h4>
                  {result.detailed_feedback?.map((fb, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Q{idx + 1}</span>
                        {fb.is_correct ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="text-rose-700 font-bold flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect (Key: {fb.correct_option})
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600">{fb.explanation}</p>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <Award className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-semibold">Answer questions and submit to generate verified evidence metrics</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
            Assessment scores automatically update your Profile Coding and Aptitude benchmarks, elevating recruiter ranking.
          </div>

        </div>

      </div>

    </div>
  );
}
