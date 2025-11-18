import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface StepLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  onBack?: () => void;
}

export function StepLayout({ children, title, description, onBack }: StepLayoutProps) {
  return (
    <div className="p-8">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>

      {children}
    </div>
  );
}