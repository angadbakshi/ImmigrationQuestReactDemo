import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Settings,
    Bell,
    HelpCircle,
    FileText,
    LogOut,
    ChevronDown,
    CheckSquare
} from 'lucide-react';
import {useAuth} from "../../../../auth/src/context/AuthContext";

export function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const menuItems = [
        {
            icon: User,
            label: 'Profile',
            path: '/profile'
        },
        {
            icon: Settings,
            label: 'Settings',
            path: '/settings'
        },
        {
            icon: Bell,
            label: 'Notifications',
            path: '/notifications'
        },
        {
            icon: CheckSquare,
            label: 'Tasks',
            path: '/tasks'
        },
        {
            icon: FileText,
            label: 'Documents',
            path: '/documents'
        },
        {
            icon: HelpCircle,
            label: 'Support',
            path: '/support'
        }
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            {/* User Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                    {user?.photoUrl ? (
                        <img
                            src={user.photoUrl}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User className="w-5 h-5 text-blue-600" />
                    )}
                </div>
                <div className="hidden md:block text-left">
                    <p className="font-medium text-gray-900 text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180' : ''
                    }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    setIsOpen(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 mt-1">
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                        >
                            <LogOut className="w-4 h-4" />
                            Log Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}