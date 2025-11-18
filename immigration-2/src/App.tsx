import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppInitialization } from './hooks/useAppInitialization';
import {Layout, LoadingScreen} from 'core';
import { useAuth } from '../../auth/src/context/AuthContext';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Documents } from './pages/Documents';
import { Learn } from './pages/Learn';
import { Support } from './pages/Support';
import { Settings } from './pages/Settings';
import { ProgramDetails } from './pages/ProgramDetails';
import { QuestDetails } from './pages/QuestDetails';
import {PrivateRoute} from '../../auth/src';
import SignupForm from './pages/SignUp';
import {WelcomeScreen} from 'core/src/components/welcome/WelcomeScreen';
import {AdminDashboard} from '../../admin/src/pages/AdminDashboard';
import {AdminLogin} from '../../admin/src/pages/Login';

import {AdminSettings} from "../../admin/src/pages/settings";
import {AdminRoute} from "../../admin/src/features/components/AdminRoute";
import {AdminLayout, ProgramManagement} from "../../admin/src/features";
import {UserManagement} from "../../admin/src/features/components/UserManagement";

function App() {
    const { initialized, error } = useAppInitialization();
    const { loading: authLoading } = useAuth();

    if (!initialized || authLoading) {
        return <LoadingScreen error={error} />;
    }

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<OnboardingWizard />} />
            <Route path="/signup" element={<SignupForm />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="programs" element={<ProgramManagement />} />
                <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Protected routes with Layout */}
            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Layout>
                        <Dashboard />
                    </Layout>
                </PrivateRoute>
            } />

            {/* Programs and Quests routes */}
            <Route path="/programs/:id" element={
                <PrivateRoute>
                    <Layout>
                        <ProgramDetails />
                    </Layout>
                </PrivateRoute>
            } />

            <Route path="/quests/:id" element={
                <PrivateRoute>
                    <Layout>
                        <QuestDetails />
                    </Layout>
                </PrivateRoute>
            } />

            {/* Other protected routes */}
            <Route path="/documents" element={
                <PrivateRoute>
                    <Layout>
                        <Documents />
                    </Layout>
                </PrivateRoute>
            } />

            <Route path="/learn" element={
                <PrivateRoute>
                    <Layout>
                        <Learn />
                    </Layout>
                </PrivateRoute>
            } />

            <Route path="/support" element={
                <PrivateRoute>
                    <Layout>
                        <Support />
                    </Layout>
                </PrivateRoute>
            } />

            <Route path="/settings" element={
                <PrivateRoute>
                    <Layout>
                        <Settings />
                    </Layout>
                </PrivateRoute>
            } />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default App;
