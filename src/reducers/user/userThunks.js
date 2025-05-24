import { GET_ALL_USERS } from '../../config/urls';
import api from '../../config/axiosConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', 
    async ({page,size}) => {
    try {
        const response = await api.get(`${GET_ALL_USERS}?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw error;
    }
});