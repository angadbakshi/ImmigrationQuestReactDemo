import { ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome to Immigration Quest
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Let's find the perfect immigration pathway for you. We'll guide you through a
        few questions to understand your profile and provide personalized recommendations.
      </p>
      <button
        onClick={onNext}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Get Started
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}