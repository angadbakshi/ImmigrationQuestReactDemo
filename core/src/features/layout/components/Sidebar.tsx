import { NavLink } from 'react-router-dom';
import {
  Home,
  FileText,
  CheckSquare,
  BookOpen,
  Users,
  Award,
  HelpCircle,
  Settings,
  User,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import {useAuth} from "../../../../../auth/src";

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: BookOpen, label: 'Learn', path: '/learn' },
  { icon: Users, label: 'Community', path: '/community' },
  { icon: Award, label: 'Progress', path: '/progress' },
  { icon: HelpCircle, label: 'Support', path: '/support' }
];

interface SidebarProps {
  isOpen: boolean,
  onClose: () => void,
  isExpanded?: boolean,
  onToggleExpand?: () => void
}

export function Sidebar({ isOpen, onClose, isExpanded: propIsExpanded, onToggleExpand }: SidebarProps) {
  const { user } = useAuth();
  const [internalIsExpanded, setInternalIsExpanded] = useState(propIsExpanded || false);

  const toggleSidebar = () => {
    const newIsExpanded = !internalIsExpanded;
    setInternalIsExpanded(newIsExpanded);
    if (onToggleExpand) {
      onToggleExpand();
    }
  };

  const isExpanded = propIsExpanded !== undefined ? propIsExpanded : internalIsExpanded;

  return (
      <>
        {isOpen && (
            <div
                className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                onClick={onClose}
            />
        )}

        <aside
            className={`
          fixed top-16 left-0 h-[calc(100vh-64px)] bg-white z-20
          transition-all duration-200 ease-in-out
          border-r border-gray-200
          ${isExpanded ? 'w-80' : 'w-20'}
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
        >
          {/* User Profile Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
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
              {isExpanded && (
                  <div className="overflow-hidden">
                    <h3 className="font-medium text-gray-900 truncate">{user?.name || 'User'}</h3>
                    <p className="text-sm text-gray-500 truncate">{user?.role || 'Guest'}</p>
                  </div>
              )}
            </div>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-3 space-y-2">
              {navItems.map((item) => (
                  <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-colors duration-150 relative
                  ${isActive
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                `}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {isExpanded && <span>{item.label}</span>}
                  </NavLink>
              ))}
            </div>
          </nav>

          {/* Footer Section (Settings and Sign Out) */}
          <div className="p-4 border-t border-gray-100 space-y-2">
            <NavLink
                to="/settings"
                onClick={onClose}
                className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
              transition-colors duration-150
              ${isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
            `}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {isExpanded && <span>Settings</span>}
            </NavLink>
            <NavLink
                to="/signout"
                onClick={onClose}
                className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
              transition-colors duration-150
              ${isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
            `}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {isExpanded && <span>Sign Out</span>}
            </NavLink>
          </div>
        </aside>
      </>
  );
}