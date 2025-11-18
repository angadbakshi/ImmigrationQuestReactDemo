import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useAuth} from "../../../../auth/src/context/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const {user} = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/admin/login" state={{from: location}} replace/>;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/login" replace/>;
  }

  return <>{children}</>;
} 