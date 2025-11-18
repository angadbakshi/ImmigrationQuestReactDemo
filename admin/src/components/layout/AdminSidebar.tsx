import { NavLink } from 'react-router-dom';
import { Home, Users, FileText, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@auth/context';

export function AdminSidebar() {
    const { signOut } = useAuth();

    const navItems = [
        { to: '/admin/dashboard', icon: Home, label: 'Dashboard' },
        { to: '/admin/users', icon: Users, label: 'Users' },
        { to: '/admin/programs', icon: FileText, label: 'Programs' },
        { to: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="bg-gray-800 w-64 min-h-screen flex flex-col">
            <div className="p-4">
                <h1 className="text-white text-xl font-bold">Immigration Quest</h1>
            </div>

            <nav className="mt-8 flex-1">
                <div className="px-2 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                    isActive
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`
                            }
                        >
                            <item.icon className="mr-3 h-6 w-6" />
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </nav>

            <div className="p-4">
                <button
                    onClick={() => signOut()}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md w-full"
                >
                    <LogOut className="mr-3 h-6 w-6" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}