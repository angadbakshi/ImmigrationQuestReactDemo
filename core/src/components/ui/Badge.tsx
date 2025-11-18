import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors';
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800 hover:bg-blue-200', // Light blue background, dark blue text
    success: 'bg-green-100 text-green-800 hover:bg-green-200', // Light green background, dark green text
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200', // Light yellow background, dark yellow text
  };

  return (
      <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}