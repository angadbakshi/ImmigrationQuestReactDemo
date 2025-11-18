import React from 'react';
import { StepProps } from '../types';
import {StepLayout} from "../../ui/StepLayout";

export function FamilyStatusStep({ data, onUpdate, onNext, onBack }: StepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <StepLayout
      title="Family Status"
      description="Information about your family situation helps us determine eligible immigration programs."
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Marital Status
          </label>
          <select
            value={data.maritalStatus}
            onChange={(e) => onUpdate({ maritalStatus: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="commonLaw">Common-Law</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        {(data.maritalStatus === 'married' || data.maritalStatus === 'commonLaw') && (
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.spouseCanadian}
                onChange={(e) => onUpdate({ spouseCanadian: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                My spouse/partner is a Canadian citizen or permanent resident
              </span>
            </label>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Dependent Children
          </label>
          <select
            value={data.children}
            onChange={(e) => onUpdate({ children: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="0">No children</option>
            <option value="1">1 child</option>
            <option value="2">2 children</option>
            <option value="3">3 children</option>
            <option value="4">4 or more children</option>
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