import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../auth/src/context/AuthContext';
import { LogOut, User, Settings } from 'lucide-react';

export function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
            >
                <img
                    src={user.photoUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:inline text-sm font-medium text-gray-700">
          {user.name}
        </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-900 border-b">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-gray-500">{user.email}</p>
                    </div>

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            navigate('/profile');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                        <User className="w-4 h-4" />
                        Profile
                    </button>

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            navigate('/settings');
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}