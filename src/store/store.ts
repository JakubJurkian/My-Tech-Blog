import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profileSlice';
import authReducer from './authSlice';
import postsSlice from './postsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsSlice,
    profile: profileSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
