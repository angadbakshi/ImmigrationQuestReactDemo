import { Navigate } from 'react-router-dom';
import { useAuth } from '@auth/context';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export function ProtectedRoute({
                                   children,
                                   redirectTo = '/admin/login'
                               }: ProtectedRouteProps) {
    const { user, isLoading } = useAuth();

    // Show loading state while checking authentication
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to={redirectTo} replace />;
    }

    // Render children if authenticated
    return <>{children}</>;
}