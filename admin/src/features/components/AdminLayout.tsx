import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import {AdminSidebar} from "./AdminSidebar";
import {useAuth} from "../../../../auth/src/context";

export function AdminLayout({ children }: { children?: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Changed to true by default
  const [isExpanded, setIsExpanded] = useState(true);
  const { user } = useAuth();

  const handleSidebarToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-30 h-16">
          <div className="max-w-screen-2xl mx-auto h-full px-4 flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">Admin Portal</span>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user?.name || 'Admin User'}</span>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area with Sidebar */}
        <div className="flex pt-16 min-h-screen">
          {/* Admin Sidebar - Fixed position */}
          <AdminSidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              isExpanded={isExpanded}
              onToggleExpand={handleSidebarToggle}
          />

          {/* Main Content - Adjusts based on sidebar state */}
          <main className={`flex-1 transition-all duration-200 ${isExpanded ? 'ml-64' : 'ml-20'}`}>
            <div className="max-w-7xl mx-auto p-6">
              {children || <Outlet />}
            </div>
          </main>
        </div>
      </div>
  );
}