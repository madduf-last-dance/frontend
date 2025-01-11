import apiClient from './apiConfig';

export const createReservation = async (data) => {
    try {
        const response = await apiClient.post(`/reservation/createReservation`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const userReservations = async (id) => {
    try {
        const response = await apiClient.get(`/reservation/findByUser/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const accommodationReservations = async (id) => {
    try {
        const response = await apiClient.get(`/reservation/findByAccommodation/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const cancelPending = async (id) => {
    try {
        const response = await apiClient.delete(`/reservation/cancelReservationPending/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const cancelAccepted = async (id) => {
    try {
        const response = await apiClient.delete(`/reservation/cancelReservationAccepted/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const acceptReservation = async (id) => {
    try {
        const response = await apiClient.get(`/reservation/accept/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
