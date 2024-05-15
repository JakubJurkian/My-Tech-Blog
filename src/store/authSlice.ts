import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: { email: string | null; name: string; uid: string } | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  postsAmount: number;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  postsAmount: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLoading: (state) => {
      state.loading = true;
    },
    authSuccess: (
      state,
      action: PayloadAction<{ email: string | null; name: string; uid: string }>
    ) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = true;
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    authLogout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = false;
    },
  },
});

export const { authLoading, authSuccess, authFailure, authLogout } =
  authSlice.actions;

export default authSlice.reducer;
