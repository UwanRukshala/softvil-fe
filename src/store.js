import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/userSlice';
import eventReducer from './reducers/event/eventsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventReducer,
  },
});
