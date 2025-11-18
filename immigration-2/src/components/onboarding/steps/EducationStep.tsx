import { StepProps } from '../types';
import { StepLayout } from '../../../../../core/src/components/ui/StepLayout.tsx';

export function EducationStep({ data, onUpdate, onNext, onBack }: StepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <StepLayout
      title="Education Background"
      description="Tell us about your educational qualifications to help determine your eligibility."
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Highest Level of Education
          </label>
          <select
            value={data.educationLevel}
            onChange={(e) => onUpdate({ educationLevel: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select education level</option>
            <option value="highSchool">High School</option>
            <option value="diploma">Diploma</option>
            <option value="bachelors">Bachelor's Degree</option>
            <option value="masters">Master's Degree</option>
            <option value="phd">Ph.D.</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.studiedInCanada}
              onChange={(e) => onUpdate({ studiedInCanada: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">I studied in Canada</span>
          </label>
        </div>

        {data.studiedInCanada && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Canadian Institution
              </label>
              <input
                type="text"
                value={data.canadianInstitution}
                onChange={(e) => onUpdate({ canadianInstitution: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter institution name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Study Duration
              </label>
              <select
                value={data.studyDuration}
                onChange={(e) => onUpdate({ studyDuration: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select duration</option>
                <option value="lessThan1">Less than 1 year</option>
                <option value="1-2">1-2 years</option>
                <option value="2-3">2-3 years</option>
                <option value="3+">More than 3 years</option>
              </select>
            </div>
          </>
        )}

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