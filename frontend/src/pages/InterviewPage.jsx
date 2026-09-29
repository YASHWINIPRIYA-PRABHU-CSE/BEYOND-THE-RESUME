import React, { useState, useEffect } from 'react';
import { interviewApi } from '../services/api';
import { 
  Mic, Sparkles, CheckCircle2, AlertCircle, ArrowRight, 
  Send, RefreshCw, Layers, ShieldCheck, HelpCircle
} from 'lucide-react';

export default function InterviewPage() {
  const [role, setRole] = useState("Software Developer");
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, [role]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const data = await interviewApi.getQuestions(role);
      setQuestions(data);
      setCurrentIdx(0);
      setUserAnswer("");
      setEvaluation(null);
    } catch (e) {
      console.error("Error loading interview questions:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const currentQ = questions[currentIdx];
    if (!currentQ) return;

    try {
      setEvaluating(true);
      const res = await interviewApi.evaluate({
        question_id: currentQ.id,
        role: role,
        user_answer: userAnswer
      });
      setEvaluation(res);
    } catch (err) {
      console.error("Evaluation error:", err);
    } finally {
      setEvaluating(false);
    }
  };

  const currentQ = questions[currentIdx];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 bg-slate-50/50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-2 border border-emerald-200">
            <Mic className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Mock Interview Simulator</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Interview Readiness & STAR Practice
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">
            Interactive answer evaluation analyzing structure, keyword depth, and STAR alignment (Situation, Task, Action, Result).
          </p>
        </div>

        {/* Role Selector */}
        <div className="w-full sm:w-60">
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Interview Track</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 shadow-xs"
          >
            <option value="Software Developer">Software Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
          </select>
        </div>
      </div>

      {/* Main Interview Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Current Question & Answer Box */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 space-y-5">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-600 uppercase">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentIdx === 0}
                onClick={() => { setCurrentIdx(currentIdx - 1); setEvaluation(null); setUserAnswer(""); }}
                className="px-3 py-1 text-xs font-bold rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
              >
                Previous
              </button>
              <button
                disabled={currentIdx >= questions.length - 1}
                onClick={() => { setCurrentIdx(currentIdx + 1); setEvaluation(null); setUserAnswer(""); }}
                className="px-3 py-1 text-xs font-bold rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          </div>

          {currentQ ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide">
                  {currentQ.category}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base mt-1 leading-snug">
                  {currentQ.question}
                </h3>
                <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200/70 text-xs text-slate-700 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>STAR Guidance: </strong>{currentQ.star_guidance}</span>
                </div>
              </div>

              {/* Text Input Area */}
              <form onSubmit={handleEvaluate} className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Your Spoken or Written Response:
                </label>
                <textarea
                  rows={6}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your structured answer here. Include the technical mechanism, trade-offs, and an example of how you used it in a project..."
                  className="w-full text-xs font-medium p-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500 font-semibold">
                    Word Count: {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                  <button
                    type="submit"
                    disabled={evaluating || !userAnswer.trim()}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-all"
                  >
                    {evaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Evaluating...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Response</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <p className="text-xs text-slate-600">No questions available for this role.</p>
          )}

        </div>

        {/* Right Column: AI Feedback & Scores */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Automated Feedback & Score
              </h3>
              {evaluation && (
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {evaluation.overall_score}/100
                </span>
              )}
            </div>

            {evaluation ? (
              <div className="space-y-4 mt-4">
                
                {/* Score Pills */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-600 block">Clarity</span>
                    <span className="font-extrabold text-slate-900 text-xs">{evaluation.clarity_score}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-600 block">Depth</span>
                    <span className="font-extrabold text-slate-900 text-xs">{evaluation.completeness_score}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-600 block">STAR Alignment</span>
                    <span className="font-extrabold text-slate-900 text-xs">{evaluation.star_alignment_score}%</span>
                  </div>
                </div>

                {/* Feedback text */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase">Constructive Feedback:</h4>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {evaluation.feedback}
                  </p>
                </div>

                {/* Strong Points */}
                <div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Strong Elements Identified:
                  </h4>
                  <div className="mt-1 space-y-1">
                    {evaluation.strong_points?.map((sp, idx) => (
                      <div key={idx} className="text-xs text-slate-700 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                        {sp}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing concepts */}
                {evaluation.missing_concepts?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-amber-800 uppercase flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      Concepts to Expand:
                    </h4>
                    <div className="mt-1 space-y-1">
                      {evaluation.missing_concepts?.map((mc, idx) => (
                        <div key={idx} className="text-xs text-slate-700 bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                          {mc}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <Mic className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-semibold">Submit an answer to receive instant NLP rubric evaluation</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600">
            Note: Automated feedback assesses terminology frequency, structural markers, and length. It does not replace human conversational evaluation.
          </div>

        </div>

      </div>

    </div>
  );
}
