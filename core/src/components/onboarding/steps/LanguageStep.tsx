import React from 'react';
import { StepProps } from '../types';
import {StepLayout} from "../../ui/StepLayout";

export function LanguageStep({ data, onUpdate, onNext, onBack }: StepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <StepLayout
      title="Language Proficiency"
      description="Tell us about your language test results or planned test date."
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language Test
          </label>
          <select
            value={data.languageTest}
            onChange={(e) => onUpdate({ languageTest: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select test</option>
            <option value="ielts">IELTS</option>
            <option value="celpip">CELPIP</option>
            <option value="tef">TEF</option>
            <option value="tcf">TCF</option>
          </select>
        </div>

        {data.languageTest && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Listening Score
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="9"
                value={data.scores.listening}
                onChange={(e) => onUpdate({ 
                  scores: { ...data.scores, listening: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Speaking Score
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="9"
                value={data.scores.speaking}
                onChange={(e) => onUpdate({ 
                  scores: { ...data.scores, speaking: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reading Score
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="9"
                value={data.scores.reading}
                onChange={(e) => onUpdate({ 
                  scores: { ...data.scores, reading: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Writing Score
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="9"
                value={data.scores.writing}
                onChange={(e) => onUpdate({ 
                  scores: { ...data.scores, writing: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
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