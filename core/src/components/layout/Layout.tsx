import React, { useState } from 'react';
import {Footer, Header, QuickActions, Sidebar} from "../../features/layout";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

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
                {/* Sidebar */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    isExpanded={isExpanded}
                    onToggleExpand={handleSidebarToggle}
                />

                {/* Main Content */}
                <main className={`
                    flex-1
                    transition-all duration-200
                    ${isExpanded ? 'lg:pl-72' : 'lg:pl-20'}
                `}>
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        {children}
                    </div>

                    {/* Footer */}
                    <Footer />
                    {/* Quick Actions */}
                    <QuickActions />
                </main>
            </div>


        </div>
    );
}