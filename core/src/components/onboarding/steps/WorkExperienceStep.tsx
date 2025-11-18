import React from 'react';
import {StepLayout} from "../../ui/StepLayout";
import {StepProps} from "../types";

export function WorkExperienceStep({ data, onUpdate, onNext, onBack }: StepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <StepLayout
      title="Work Experience"
      description="Tell us about your work experience to help determine your eligibility."
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Years of Work Experience
          </label>
          <select
            value={data.yearsExperience}
            onChange={(e) => onUpdate({ yearsExperience: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select experience</option>
            <option value="less1">Less than 1 year</option>
            <option value="1-2">1-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">More than 5 years</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.currentlyEmployed}
              onChange={(e) => onUpdate({ currentlyEmployed: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">I am currently employed</span>
          </label>
        </div>

        {data.currentlyEmployed && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Job Title
            </label>
            <input
              type="text"
              value={data.jobTitle}
              onChange={(e) => onUpdate({ jobTitle: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter job title"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            NOC Code
          </label>
          <input
            type="text"
            value={data.nocCode}
            onChange={(e) => onUpdate({ nocCode: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter NOC code"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.hasJobOffer}
              onChange={(e) => onUpdate({ hasJobOffer: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">I have a job offer in Canada</span>
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