import apiClient from './apiConfig';

export const login = async (loginData) => {
    try {
        const response = await apiClient.post(`/user/login`, loginData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerGuest = async (registerGuestData) => {
    try {
        const response = await apiClient.post(`/user/register/guest`, registerGuestData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerHost = async (registerHostData) => {
    try {
        const response = await apiClient.post(`/user/register/host`, registerHostData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const profile = async () => {
    try {
        const response = await apiClient.get(`/user/profile`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const updateProfile = async (profileData) => {
    try {
        const response = await apiClient.post(`/user/update`,profileData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
