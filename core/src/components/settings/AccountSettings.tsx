import React from 'react';
import { Camera } from 'lucide-react';
import {useAuth} from "../../../../auth/src/context/AuthContext";

export function AccountSettings() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
      
      <div className="flex items-start gap-6">
        <div className="relative">
          <img
            src={user?.photoUrl}
            alt={user?.name}
            className="w-20 h-20 rounded-full"
          />
          <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              defaultValue={user?.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}