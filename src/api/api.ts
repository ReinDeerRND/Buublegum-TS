import axios from "axios";

export const axiosConfig = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: { "API-KEY": "5e9b0567-1d4c-4f0c-b3cd-9aba89e52c00" }
})
