import { useRouteError } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import BackgroundImg from '../components/BackgroundImg';

const ErrorPage = () => {
  const error: any = useRouteError();
  console.log(error);

  let title = 'An error occured!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page';
  }

  return (
    <>
      <MainNavigation />
      <BackgroundImg />
      <div className="flex justify-center">
        <div className="flex flex-col items-center relative bottom-16 smallMobile:bottom-24 bg-slate-800 p-6 border-2">
          <span className="text-6xl space">{error.status}</span>
          <h1 className="text-4xl mb-3 tablet:text-5xl">{title}</h1>
          <p className="text-md smallMobile:text-xl tablet:text-2xl">
            {message}
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
