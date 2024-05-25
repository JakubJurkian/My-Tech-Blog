import { Outlet } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import MainNavigation from '../components/MainNavigation';
import BackgroundImg from '../components/BackgroundImg';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPostsOnly } from '../util/fetchPostsOnly';

const RootLayout = () => {
  const [transition] = useAutoAnimate();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await fetchPostsOnly(dispatch);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  console.log('root');

  return (
    <>
      <>
        <MainNavigation />
        <BackgroundImg />
      </>
      <main ref={transition}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
