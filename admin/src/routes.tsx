import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import {AdminLogin} from "@/pages/Login.tsx";
import {AdminLayout, AdminRoute} from "@/features";


export function AdminRoutes() {
    return (
        <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminLayout />
                    </AdminRoute>
                }
            >
                <Route index element={<Navigate to="dashboard" replace