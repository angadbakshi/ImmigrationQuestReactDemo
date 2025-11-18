import { StepProps } from '../types';
import { StepLayout } from '../../../../../core/src/components/ui/StepLayout.tsx';

export function PersonalDetailsStep({ data, onUpdate, onNext, onBack }: StepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <StepLayout
      title="Personal Details"
      description="Tell us more about yourself to help us understand your eligibility."
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onUpdate({ dateOfBirth: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nationality
          </label>
          <select
            value={data.nationality}
            onChange={(e) => onUpdate({ nationality: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select nationality</option>
            <option value="IN">India</option>
            <option value="CN">China</option>
            <option value="PH">Philippines</option>
            <option value="NG">Nigeria</option>
            {/* Add more countries */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Country of Residence
          </label>
          <select
            value={data.currentCountry}
            onChange={(e) => onUpdate({ currentCountry: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select country</option>
            <option value="CA">Canada</option>
            <option value="IN">India</option>
            <option value="CN">China</option>
            <option value="PH">Philippines</option>
            <option value="NG">Nigeria</option>
            {/* Add more countries */}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.inCanada}
              onChange={(e) => onUpdate({ inCanada: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">I am currently in Canada</span>
          </label>
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