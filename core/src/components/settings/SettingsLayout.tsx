import React from 'react';
import { Card } from '../../../../core/src/components/ui/Card';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>
      
      <Card className="divide-y divide-gray-200">
        {children}
      </Card>
    </div>
  );
}