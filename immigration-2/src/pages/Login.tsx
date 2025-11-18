import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../../../auth/src/components/LoginForm';
import { useAuth } from '../../../auth/src/context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // Get the intended destination or default to dashboard
      const destination = location.state?.from?.pathname || '/dashboard';
      navigate(destination, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}