import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  name: string;
  email: string | null;
  avatarUrl: string;
}

const initialState: ProfileState = {
  name: '',
  email: '',
  avatarUrl: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      state.avatarUrl = action.payload;
    },
  },
});

export const { updateName, updateEmail, updateAvatar } = profileSlice.actions;
export default profileSlice.reducer;
