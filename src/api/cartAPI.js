import axios from "axios";
import {refreshToken} from "./authService";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 10000,
})

export const fetchCartById = async () => {
    let accessToken = localStorage.getItem('access_token');
    const cartId = localStorage.getItem('cartId');
    try {

        const response = await axiosInstance.get(`/cart/${cartId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response;
    } catch (error){
        if (error.response && error.response.status === 401) {
            try {
                await refreshToken();
                accessToken = localStorage.getItem('access_token');
                const response = await axiosInstance.get(`/carts/${cartId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                return response;
            } catch (refreshError) {
                console.log("Refresh token failed: ", refreshError);
                throw refreshError;
            }
        } else {
            console.log("Error: ", error);
            throw error;
        }
    }
}
