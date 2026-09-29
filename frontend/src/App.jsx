import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import ProfilePage from './pages/ProfilePage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import PlacementPredictionPage from './pages/PlacementPredictionPage';
import SalaryEstimationPage from './pages/SalaryEstimationPage';
import CareerRecommendationsPage from './pages/CareerRecommendationsPage';
import SkillGapPage from './pages/SkillGapPage';
import RoadmapPage from './pages/RoadmapPage';
import InterviewPage from './pages/InterviewPage';
import AssessmentPage from './pages/AssessmentPage';
import JobMatcherPage from './pages/JobMatcherPage';
import ProgressTrackingPage from './pages/ProgressTrackingPage';
import ModelInsightsPage from './pages/ModelInsightsPage';
import ResponsibleAIPage from './pages/ResponsibleAIPage';
import RecruiterPage from './pages/RecruiterPage';
import InstitutionPage from './pages/InstitutionPage';
import SettingsPage from './pages/SettingsPage';
import DocumentationPage from './pages/DocumentationPage';
import AuthModal from './pages/AuthModal';

function MainLayout() {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('landing');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Render current active page
  const renderContent = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage setActivePage={setActivePage} />;
      case 'dashboard':
        return <StudentDashboard setActivePage={setActivePage} />;
      case 'profile':
        return <ProfilePage setActivePage={setActivePage} />;
      case 'resume':
        return <ResumeAnalyzerPage setActivePage={setActivePage} />;
      case 'placement':
        return <PlacementPredictionPage setActivePage={setActivePage} />;
      case 'salary':
        return <SalaryEstimationPage setActivePage={setActivePage} />;
      case 'recommendations':
        return <CareerRecommendationsPage setActivePage={setActivePage} />;
      case 'skill-gap':
        return <SkillGapPage setActivePage={setActivePage} />;
      case 'roadmap':
        return <RoadmapPage setActivePage={setActivePage} />;
      case 'interview':
        return <InterviewPage setActivePage={setActivePage} />;
      case 'assessments':
        return <AssessmentPage setActivePage={setActivePage} />;
      case 'job-matcher':
        return <JobMatcherPage setActivePage={setActivePage} />;
      case 'progress':
        return <ProgressTrackingPage setActivePage={setActivePage} />;
      case 'model-insights':
        return <ModelInsightsPage setActivePage={setActivePage} />;
      case 'responsible-ai':
        return <ResponsibleAIPage setActivePage={setActivePage} />;
      case 'recruiter':
        return <RecruiterPage setActivePage={setActivePage} />;
      case 'institution':
        return <InstitutionPage setActivePage={setActivePage} />;
      case 'settings':
        return <SettingsPage setActivePage={setActivePage} />;
      case 'docs':
        return <DocumentationPage setActivePage={setActivePage} />;
      default:
        return <StudentDashboard setActivePage={setActivePage} />;
    }
  };

  const isLanding = activePage === 'landing';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        openAuthModal={() => setIsAuthModalOpen(true)} 
      />

      <div className="flex-1 flex overflow-hidden">
        {!isLanding && (
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        )}
        <main className={`flex-1 overflow-y-auto ${isLanding ? 'w-full' : ''}`}>
          {renderContent()}
        </main>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
