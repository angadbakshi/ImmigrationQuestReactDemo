import { StepProps } from '../types';
import { StepLayout } from '../../../../../core/src/components/ui/StepLayout.tsx';

export function GoalsStep({ data, onUpdate, onNext, onBack }: StepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <StepLayout
      title="Immigration Goals"
      description="Tell us about your immigration goals to help us provide the best recommendations."
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Primary Goal
          </label>
          <select
            value={data.primaryGoal}
            onChange={(e) => onUpdate({ primaryGoal: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select goal</option>
            <option value="study">Study in Canada</option>
            <option value="work">Work in Canada</option>
            <option value="pr">Permanent Residency</option>
            <option value="visit">Visit Canada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Timeline
          </label>
          <select
            value={data.timeline}
            onChange={(e) => onUpdate({ timeline: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select timeline</option>
            <option value="immediate">Immediate</option>
            <option value="3-6">3-6 months</option>
            <option value="6+">6+ months</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continue
        </button>
      </form>
    </StepLayout>
  );
}