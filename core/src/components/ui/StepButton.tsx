import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StepButtonProps {
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: React.ReactNode;
  icon?: boolean;
}

export function StepButton({ 
  type = 'submit',
  onClick,
  children,
  icon = true
}: StepButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {children}
      {icon && <ArrowRight className="w-5 h-5" />}
    </button>
  );
}