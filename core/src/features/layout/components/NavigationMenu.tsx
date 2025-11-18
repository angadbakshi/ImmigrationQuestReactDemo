import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, FileText, CheckSquare, BookOpen,
  Users, Award, HelpCircle, Settings,
  UserCog, Database, Shield
} from 'lucide-react';
import {useAuth} from "../../../../../auth/src";

interface NavigationMenuProps {
  mobile?: boolean;
}

export function NavigationMenu({ mobile = false }: NavigationMenuProps) {
  const location = useLocation();
  const { user } = useAuth();
  console.log('Current user:', user); // Debug user state
  const isAdmin = user?.role === 'admin';
  console.log('Is admin:', isAdmin); // Debug admin status

  const userMenuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: FileText, label: 'Documents', href: '/documents' },
    { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
    { icon: BookOpen, label: 'Learn', href: '/learn' },
    { icon: Users, label: 'Community', href: '/community' },
    { icon: Award, label: 'Progress', href: '/progress' },
    { icon: HelpCircle, label: 'Support', href: '/support' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const adminMenuItems = [
    { icon: UserCog, label: 'User Management', href: '/admin/users' },
    { icon: Database, label: 'Program Management', href: '/admin/programs' },
    { icon: Shield, label: 'Admin Dashboard', href: '/admin/dashboard' },
  ];

  const menuItems = user?.role === 'admin'
      ? [...userMenuItems, ...adminMenuItems]
      : userMenuItems;

  const baseItemClasses = "flex items-center gap-2 px-4 py-2 rounded-md transition-colors";
  const mobileItemClasses = "flex items-center gap-2 px-4 py-3 border-b border-gray-100 transition-colors";

  const getItemClasses = (href: string) => {
    const isActive = location.pathname === href;
    const baseClasses = mobile ? mobileItemClasses : baseItemClasses;

    return `${baseClasses} ${
        isActive
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    }`;
  };

  return (
      <nav className={mobile ? "py-2" : "flex items-center gap-2"}>
        {menuItems.map((item) => (
            <Link
                key={item.href}
                to={item.href}
                className={getItemClasses(item.href)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
        ))}
      </nav>
  );
}