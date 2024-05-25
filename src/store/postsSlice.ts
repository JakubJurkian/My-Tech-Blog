import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  postId: string;
  id: string;
  author: string;
  date: string;
  addedXAgo: string;
  description: string;
  img: string;
  text: string;
  title: string;
}

interface PostsState {
  posts: Post[];
  postsAmount: number;
}

const initialState: PostsState = {
  posts: [],
  postsAmount: 0,
};

const authSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    howManyPosts: (state, action: PayloadAction<number>) => {
      state.postsAmount = action.payload;
    },
  },
});

export const { getPosts, howManyPosts } = authSlice.actions;

export default authSlice.reducer;
