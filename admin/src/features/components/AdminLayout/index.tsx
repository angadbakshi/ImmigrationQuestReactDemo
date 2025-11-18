import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../AdminSidebar';
import {useAuth} from "@auth/context";
import {Header} from "@core/features/layout";

interface AdminLayoutProps {
    children?: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const { user } = useAuth();

    const handleSidebarToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <Header
                onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                isSidebarOpen={isSidebarOpen}
                isExpanded={isExpanded}
                onToggleExpand={handleSidebarToggle}
            />

            {/* Main Content Area */}
            <div className="flex flex-1 pt-16">
                {/* Admin Sidebar */}
                <AdminSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    isExpanded={isExpanded}
                    onToggleExpand={handleSidebarToggle}
                />

                {/* Main Content */}
                <main className={`
          flex-1
          transition-all duration-200
          ${isExpanded ? 'lg:pl-64' : 'lg:pl-20'}
        `}>
                    <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
                        {children || <Outlet />}
                    </div>
                </main>
            </div>
        </div>
    );
}