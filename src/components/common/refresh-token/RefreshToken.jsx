import React, {useEffect} from 'react';
import {Navigate, useNavigate} from "react-router-dom";

const RefreshToken = async (navigate) => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        console.log(refreshToken);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-token": refreshToken
            }
        });

        if (response.ok) {
            const result = await response.json();
            // Cập nhật token mới vào localStorage
            localStorage.setItem('access_token', result.accessToken);
            localStorage.setItem('refresh_token', result.refreshToken);
            return result.accessToken;
        } else {
            // Refresh token thất bại, xóa localStorage và chuyển tới trang login
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            navigate("/login");
            return null;
        }
    } catch (err) {
        // Xử lý lỗi kết nối tới server
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate("/login");
        return null;
    }
}
export default RefreshToken;