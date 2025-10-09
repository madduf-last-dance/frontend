// src/services/ratingService.js
import apiClient from './apiConfig';
import { jwtDecode } from 'jwt-decode';

export const createRating = async (data) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Missing auth token');

    const decoded = jwtDecode(token);
    console.log(decoded)
    const usedId = decoded?.sub || decoded?.id

    const payload = { ...data, usedId };

    console.log('Sending rating payload:', payload);

    const response = await apiClient.post(`/rating/createRating`, payload);
    return response.data;
  } catch (error) {
    console.error('createRating error:', error.response?.data || error.message);
    throw error;
  }
};

export const updateRating = async (data) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Missing auth token');

    const decoded = jwtDecode(token);
    const usedId = decoded?.userId || decoded?.id || decoded?.sub;

    const payload = { ...data, usedId };

    const response = await apiClient.post(`/rating/updateRating`, payload);
    return response.data;
  } catch (error) {
    console.error('updateRating error:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteRating = async (id) => {
  try {
    const response = await apiClient.delete(`/rating/${id}`);
    return response.data;
  } catch (error) {
    console.error('deleteRating error:', error.response?.data || error.message);
    throw error;
  }
};

export const getRatingsForTarget = async (ratingType, ratingId) => {
  try {
    const response = await apiClient.get(`/rating/ratingsForTarget`, {
      params: { ratingType, ratingId },
    });
    return response.data;
  } catch (error) {
    console.error('getRatingsForTarget error:', error.response?.data || error.message);
    throw error;
  }
};
