import apiClient from './apiConfig';

export const search = async (searchData) => {
    try {
        const response = await apiClient.get(`/accommodation/search`, {
        params: {
        location: searchData.location,
        numberOfGuests: searchData.numberOfGuests,
        startDate: searchData.startDate,
        endDate: searchData.endDate}});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const create = async (data) => {
    try {
        const response = await apiClient.post(`/accommodation/createAccommodation`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const update = async (data) => {
    try {
        const response = await apiClient.post(`/accommodation/updateAccommodation`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const allHotelsHost = async () => {
    try {
        const response = await apiClient.get(`/accommodation/findAllAccommodationsHost`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const findById = async (id) => {
    try {
        const response = await apiClient.get(`/accommodation/findOneAccommodation/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const saveAvalabilities = async (id, data) => {
    try {
        const response = await apiClient.post(`/accommodation/saveAvailabilities/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteAccommodation = async (id) => {
    try {
        const response = await apiClient.delete(`/accommodation/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

