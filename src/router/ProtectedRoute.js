// src/ProtectedRoute.js
import React, { useContext, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import { refreshToken } from "../api/authService";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleRefreshToken = async () => {
            try {
                await refreshToken(); // Cố gắng refresh token
            } catch {
                // Nếu refresh token thất bại, cập nhật trạng thái đăng nhập
                navigate('/login');
            }
        };

        if (!isLoggedIn) {
            handleRefreshToken(); // Nếu chưa đăng nhập, cố gắng refresh token
        }
    }, [isLoggedIn, navigate]);

    // Nếu đã đăng nhập, trả về children; nếu chưa, chuyển hướng đến login
    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
