import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../config/axiosConfig';
import { GET_ALL_EVENTS } from '../../config/urls';

export const fetchAllEvents = createAsyncThunk('events/fetchAllEvents', async (
    { page, size, visibility }
) => {
    try {
        const response = await api.get(`${GET_ALL_EVENTS}?page=${page}&size=${size}&visibility=${visibility}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw error;
    }
});

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        allEvents: {
            content: [],
            totalElements: 0
        },
        loading: false,
        error: null,
    },
    reducers: {
        addEvent: (state, action) => {
            state.allEvents.content.unshift(action.payload);
            state.allEvents.totalElements += 1;
        },
        setAllEvents: (state, action) => {
            state.allEvents.content = action.payload.content;
            state.allEvents.totalElements = action.payload.totalElements;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllEvents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllEvents.fulfilled, (state, action) => {
                state.loading = false;
               
                state.allEvents.content = action.payload.content;
                state.allEvents.totalElements = action.payload.totalElements;
            })
            .addCase(fetchAllEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export const { addEvent, updateEvent, setAllEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
