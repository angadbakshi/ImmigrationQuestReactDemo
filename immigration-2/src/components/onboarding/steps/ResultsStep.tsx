import { StepProps } from '../types';
import { StepLayout } from '../../../../../core/src/components/ui/StepLayout.tsx';
import { Card } from '../../../../../core/src/components/ui/Card';
import { Badge } from '../../../../../core/src/components/ui/Badge';
import { CheckCircle, Clock, AlertTriangle, Loader2 } from 'lucide-react';

interface ProgramRecommendation {
  id: string;
  name: string;
  timeline: string;
  probability: 'low' | 'medium' | 'high';
  description: string;
}

// Create a custom type for ResultsStep that only includes the props it needs
type ResultsStepProps = {
  data: StepProps['data'];
  onBack: () => void;
  onComplete: () => void;
  isSubmitting: boolean;
};

export function ResultsStep({
                              data,
                              onBack,
                              onComplete,
                              isSubmitting
                            }: ResultsStepProps) {
  const recommendations: ProgramRecommendation[] = [
    {
      id: 'fsw',
      name: 'Federal Skilled Worker Program',
      timeline: '6-12 months',
      probability: 'high',
      description: 'Based on your education and work experience, you have a strong chance of qualifying.',
    },
    {
      id: 'pnp',
      name: 'Provincial Nominee Program',
      timeline: '12-18 months',
      probability: 'medium',
      description: 'Your job offer makes you eligible for provincial nomination.',
    },
  ];

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case 'high': return 'success';
      case 'medium': return 'default';
      case 'low': return 'warning';
      default: return 'default';
    }
  };

  return (
      <StepLayout
          title="Your Immigration Pathways"
          description="Based on your profile, here are your recommended immigration programs."
          onBack={onBack}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            {recommendations.map((program) => (
                <Card key={program.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{program.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                    </div>
                    <Badge variant={getProbabilityColor(program.probability)}>
                      {program.probability.charAt(0).toUpperCase() + program.probability.slice(1)}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{program.timeline}</span>
                    </div>
                  </div>
                </Card>
            ))}
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">Next Steps</h4>
                <p className="text-sm text-blue-700 mt-1">
                  We'll create a personalized checklist and timeline for your immigration journey.
                  You'll also get access to relevant resources and guidance.
                </p>
              </div>
            </div>
          </div>
          <button
              onClick={onComplete}
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Profile...
                </>
            ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Complete Profile
                </>
            )}
          </button>
        </div>
      </StepLayout>
  );
}