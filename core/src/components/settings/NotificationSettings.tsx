import React from 'react';
import { Switch } from '../../../../core/src/components/ui/Switch';

export function NotificationSettings() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
            <p className="text-sm text-gray-500">Receive updates about your application</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Task Reminders</h3>
            <p className="text-sm text-gray-500">Get reminded about upcoming tasks</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Community Updates</h3>
            <p className="text-sm text-gray-500">Stay informed about community activity</p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
}