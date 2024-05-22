import { Outlet } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import MainNavigation from '../components/MainNavigation';
import BackgroundImg from '../components/BackgroundImg';

const RootLayout = () => {
  const [transition] = useAutoAnimate();

  return (
    <>
      <div>
        <MainNavigation />
        <BackgroundImg />
      </div>
      <main ref={transition}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
