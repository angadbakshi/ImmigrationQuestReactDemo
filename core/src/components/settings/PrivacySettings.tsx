import React from 'react';
import { Switch } from '../../../../core/src/components/ui/Switch';
import { Shield } from 'lucide-react';

export function PrivacySettings() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Profile Visibility</h3>
            <p className="text-sm text-gray-500">Make your profile visible to community members</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Progress Sharing</h3>
            <p className="text-sm text-gray-500">Share your progress with the community</p>
          </div>
          <Switch />
        </div>

        <div className="mt-6">
          <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
            <Shield className="w-4 h-4" />
            View Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}