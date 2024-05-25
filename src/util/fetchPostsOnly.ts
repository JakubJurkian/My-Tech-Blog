import { Dispatch } from 'react';
import timeAgo from './timeAgo';
import { date } from './date';
import { getPosts } from '../store/postsSlice';

export const fetchPostsOnly = async (dispatch: Dispatch<any>) => {
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_FIREBASE_REALTIME_DATABASE_POSTS_URL
  );
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  const data = await response.json();
  const loadedPosts = [];
  for (const user in data) {
    const userObj = data[user];
    for (const key in userObj) {
      loadedPosts.push({
        postId: Object.keys(userObj)[0],
        id: key,
        author: userObj[key].author,
        date: timeAgo(userObj[key].date),
        addedXAgo: date(userObj[key].date),
        img: userObj[key].img,
        text: userObj[key].text,
        title: userObj[key].title,
        description: userObj[key].description,
      });
    }
  }

  dispatch(getPosts(loadedPosts));
};
