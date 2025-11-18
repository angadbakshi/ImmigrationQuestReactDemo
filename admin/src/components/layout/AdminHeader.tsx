import { useAuth } from '@auth/context';
import { Bell, Settings, User } from 'lucide-react';

export function AdminHeader() {
    const { user } = useAuth();

    return (
        <header className="bg-white shadow">
            <div className="flex justify-between items-center px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>

                <div className="flex items-center space-x-4">
                    <button className="p-1 text-gray-400 hover:text-gray-500">
                        <Bell className="h-6 w-6" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-500">
                        <Settings className="h-6 w-6" />
                    </button>
                    <div className="flex items-center">
                        <span className="mr-2 text-sm text-gray-700">{user?.email}</span>
                        <button className="p-1 text-gray-400 hover:text-gray-500">
                            <User className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}