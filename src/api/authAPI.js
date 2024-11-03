import axios from "axios";

const axiosIntance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 10000,
})

export const refreshTokenAPI =  async (refreshToken) =>{
    try {
        const response = await axiosIntance.post(`/auth/refresh`, {
            method: "POST",
            header:{
                "Content-Type": "application/json",
                "x-token": refreshToken
            }
        })
        if(response.status != 200) throw new Error("Failed to refresh token");
        return {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken
        }

    }catch (error){
        console.error("Error refresh Token", error);
        throw error;
    }
}