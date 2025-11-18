import React from 'react';
import { Globe, Moon } from 'lucide-react';

export function PreferenceSettings() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Preferences</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Language
            </div>
          </label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Theme
            </div>
          </label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>
      </div>
    </div>
  );
}