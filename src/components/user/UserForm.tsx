import { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, CheckCircle, Save, User, Star, Smile, BookOpen, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import BasicInfoSection from './sections/BasicInfoSection';
import InterestsSection from './sections/InterestsSection';
import PersonalitySection from './sections/PersonalitySection';
import DeeperSection from './sections/DeeperSection';
import CustomSection from './sections/CustomSection';
import SubmittedPage from './SubmittedPage';

const steps = [
  { id: 'basic', label: 'About You', icon: User, color: 'rose', emoji: '🌸' },
  { id: 'interests', label: 'Interests', icon: Star, color: 'orange', emoji: '✨' },
  { id: 'personality', label: 'Personality', icon: Smile, color: 'yellow', emoji: '🌟' },
  { id: 'deeper', label: 'Deeper', icon: BookOpen, color: 'purple', emoji: '💜' },
  { id: 'custom', label: 'More Qs', icon: Sparkles, color: 'pink', emoji: '💫' },
];

export default function UserForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [savedAnimation, setSavedAnimation] = useState(false);
  const { session, draft, loadDraft, saveDraft, submitResponse, db, logout } = useStore();

  useEffect(() => {
    loadDraft();
  }, []);

  const user = db.users.find(u => u.profile.id === session?.userId);
  const hasCustomQuestions = db.questions.filter(q => q.isActive && q.fieldKey.startsWith('custom_')).length > 0;
  const visibleSteps = hasCustomQuestions ? steps : steps.filter(s => s.id !== 'custom');

  if (user?.profile.isSubmitted) {
    return <SubmittedPage user={user} onEdit={() => {}} />;
  }

  const currentStepData = visibleSteps[currentStep];

  const handleSave = () => {
    setSavedAnimation(true);
    setTimeout(() => setSavedAnimation(false), 2000);
  };

  const handleNext = () => {
    handleSave();
    if (currentStep < visibleSteps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    submitResponse();
  };

  const progress = ((currentStep + 1) / visibleSteps.length) * 100;

  const colorMap: Record<string, string> = {
    rose: 'from-rose-400 to-pink-500',
    orange: 'from-orange-400 to-amber-500',
    yellow: 'from-yellow-400 to-orange-400',
    purple: 'from-purple-400 to-violet-500',
    pink: 'from-pink-400 to-rose-400',
  };

  const bgMap: Record<string, string> = {
    rose: 'from-rose-50 via-pink-50 to-purple-50',
    orange: 'from-orange-50 via-amber-50 to-yellow-50',
    yellow: 'from-yellow-50 via-orange-50 to-amber-50',
    purple: 'from-purple-50 via-violet-50 to-indigo-50',
    pink: 'from-pink-50 via-rose-50 to-orange-50',
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgMap[currentStepData.color]} transition-all duration-500`}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 bg-gradient-to-br ${colorMap[currentStepData.color]} rounded-lg flex items-center justify-center`}>
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-semibold text-gray-800 text-sm">Getting to Know You</span>
            </div>
            <div className="flex items-center gap-2">
              {savedAnimation && (
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Saved!
                </span>
              )}
              <button
                onClick={logout}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${colorMap[currentStepData.color]} rounded-full transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">{currentStep + 1}/{visibleSteps.length}</span>
          </div>

          {/* Step Tabs */}
          <div className="flex gap-1 mt-3">
            {visibleSteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(idx)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                  idx === currentStep
                    ? `bg-gradient-to-r ${colorMap[step.color]} text-white shadow-sm`
                    : idx < currentStep
                    ? 'bg-green-50 text-green-600 border border-green-200'
                    : 'bg-gray-50 text-gray-400 border border-gray-100'
                }`}
              >
                <span className="hidden sm:inline">{step.emoji} {step.label}</span>
                <span className="sm:hidden">{step.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Section Title */}
        <div className="mb-6 text-center">
          <div className="text-4xl mb-2">{currentStepData.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800">{currentStepData.label}</h2>
          {currentStep === 0 && <p className="text-gray-500 text-sm mt-1">Let's start with the basics — take your time!</p>}
          {currentStep === 1 && <p className="text-gray-500 text-sm mt-1">Tell me about the things you love ✨</p>}
          {currentStep === 2 && <p className="text-gray-500 text-sm mt-1">Fun questions to know your vibe 🌟</p>}
          {currentStep === 3 && <p className="text-gray-500 text-sm mt-1">Optional deeper questions — only share what you're comfortable with 💜</p>}
          {currentStep === 4 && <p className="text-gray-500 text-sm mt-1">A few more questions just for you 💫</p>}
        </div>

        {/* Form Sections */}
        <div className="space-y-4">
          {currentStepData.id === 'basic' && <BasicInfoSection onSave={saveDraft} draft={draft} />}
          {currentStepData.id === 'interests' && <InterestsSection onSave={saveDraft} draft={draft} />}
          {currentStepData.id === 'personality' && <PersonalitySection onSave={saveDraft} draft={draft} />}
          {currentStepData.id === 'deeper' && <DeeperSection onSave={saveDraft} draft={draft} />}
          {currentStepData.id === 'custom' && <CustomSection onSave={saveDraft} draft={draft} questions={db.questions.filter(q => q.isActive && q.fieldKey.startsWith('custom_'))} />}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}

          {currentStep < visibleSteps.length - 1 ? (
            <button
              onClick={handleNext}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r ${colorMap[currentStepData.color]} text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-sm hover:shadow-md`}
            >
              <Save className="w-4 h-4" /> Save & Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-sm hover:shadow-md"
            >
              <Heart className="w-4 h-4 fill-white" /> Submit My Answers 💌
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
