import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsers } from './userThunks';


const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  allUsers: {
    content: [],
    totalElements: 0
  },
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;

    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    addUser: (state, action) => {
      const newUser = action.payload;
      state.allUsers.content.unshift(newUser);
      state.allUsers.totalElements += 1;
    },
    setAllUsers: (state, action) => {
      state.allUsers.content = action.payload.content;
      state.allUsers.totalElements = action.payload.totalElements;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false; 
        state.allUsers = {
          content: action.payload.content,
          totalElements: action.payload.totalElements
        };
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { loginUser, logoutUser, addUser, setAllUsers } = userSlice.actions;
export default userSlice.reducer;