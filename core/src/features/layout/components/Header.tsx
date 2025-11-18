import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Menu,
  Bell,
  MapPin,
  LogOut,
  ChevronDown,
  User as UserIcon,
  Settings,
  CheckCircle
} from 'lucide-react';
import {useAuth} from "../../../../../auth/src";

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function Header({ onMenuClick, isSidebarOpen, isExpanded, onToggleExpand }: HeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-30">
        <div className="h-16 border-b border-gray-200">
          <div className="max-w-screen-2xl mx-auto h-full px-4 flex items-center justify-between">
            {/* Left Section - Logo & Menu */}
            <div className="flex items-center gap-4 w-72">
              <button
                  onClick={onToggleExpand}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full hidden lg:block transition duration-200"
                  aria-label="Toggle menu"
              >
                <Menu className={`w-6 h-6 transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition duration-200">Immigration Quest</span>
              </div>
            </div>

            {/* Center Section - Search Bar */}
            <div className="flex-1 flex justify-center px-4">
              <div className="w-full max-w-2xl relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-4 h-5 w-5 text-gray-400 pointer-events-none" />
                  <input
                      type="text"
                      placeholder="Search resources, documents..."
                      className="w-full h-11 pl-12 pr-4 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Location */}
              <button
                  className="flex items-center gap-2 px-3 h-10 rounded-full hover:bg-gray-100 transition duration-200"
                  aria-label="Change location"
              >
                <MapPin className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Canada</span>
              </button>

              {/* Notifications */}
              <button
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition duration-200"
                  aria-label="Notifications"
              >
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs font-bold text-white bg-blue-600 rounded-full">
                3
              </span>
                <Bell className="w-6 h-6 hover:text-blue-600" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition duration-200"
                    aria-label="Profile menu"
                    aria-expanded={showProfileMenu}
                >
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {user?.photoUrl ? (
                        <img
                            src={user.photoUrl}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <UserIcon className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <ChevronDown
                      className={`w-4 h-4 text-gray-500 transform transition duration-200 ${showProfileMenu ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-gray-900 truncate">{user?.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                      </div>

                      <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            navigate('/settings');
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition duration-200 flex items-center gap-3"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>

                      <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition duration-200 flex items-center gap-3"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
  );
}