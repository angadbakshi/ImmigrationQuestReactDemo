import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
      <div
          className={`flex-1 bg-white rounded-lg shadow-md p-6 ${className}`}
          onClick={onClick}
      >
        {children}
      </div>
  );
}