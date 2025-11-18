import { NavLink } from 'react-router-dom';
import {
    Users,
    Database,
    LayoutDashboard,
    Settings,
    User
} from 'lucide-react';
import {useAuth} from "../../../../../auth/src"

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isExpanded?: boolean;
    onToggleExpand?: () => void;
}

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'User Management', path: '/admin/users' },
    { icon: Database, label: 'Program Management', path: '/admin/programs' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' }
];

export function AdminSidebar({
                                 isOpen,
                                 onClose,
                                 isExpanded = true,
                             }: AdminSidebarProps) {
    const { user } = useAuth();

    return (
        <>
            {/* Sidebar Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-16 left-0 h-[calc(100vh-64px)]
        bg-white shadow-lg z-20
        transition-all duration-200 ease-in-out
        w-64 border-r border-gray-200
      `}>
                {/* User Profile Section */}
                <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            {user?.photoUrl ? (
                                <img
                                    src={user.photoUrl}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <User className="w-5 h-5 text-gray-600" />
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="font-medium text-gray-900 truncate">
                                {user?.name || 'Admin'}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">
                                {user?.role || 'admin'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg
                text-sm font-medium transition-colors duration-150
                ${isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
}