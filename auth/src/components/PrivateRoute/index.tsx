import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useAuth} from "../../context";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiresOnboarding?: boolean;
}

export function PrivateRoute({ children, requiresOnboarding = true }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show nothing while checking auth status
  if (loading) {
    return null;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user hasn't completed onboarding and is trying to access a protected route
  if (requiresOnboarding && !user.onboardingCompleted && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }

  // If user has completed onboarding and tries to access onboarding page
  if (user.onboardingCompleted && location.pathname === '/onboarding') {
    return <Navigate to="/dashboard" replace />;
  }

  // For admin users, redirect to admin dashboard
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}