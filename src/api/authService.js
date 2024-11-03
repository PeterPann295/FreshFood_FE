import {refreshTokenAPI} from "./authAPI";

export const refreshToken =  async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if(!refreshToken){
        return null;
    }
    try {
        const token = refreshTokenAPI(refreshToken);
        localStorage.setItem("access_token", token.accessToken);
        localStorage.setItem("refresh_token", token.refreshToken);
        return token.accessToken;

    }catch (error){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('cartId');
        window.location.href = "/login";
        throw error;
    }
}

