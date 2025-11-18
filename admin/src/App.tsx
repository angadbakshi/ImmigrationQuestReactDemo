import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLogin } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProtectedRoute } from '../src/components/auth/ProtectedRoute';
import {AdminLayout} from "../../admin/src/features";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<AdminDashboard />} />
                    <Route path="programs" element={<AdminDashboard />} />
                    <Route path="settings" element={<AdminDashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;