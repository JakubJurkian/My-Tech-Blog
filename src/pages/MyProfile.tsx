import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../store/store';
import MyProfilePage from '../components/MyProfile';

function AboutMePage() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  return (
    <div className="bg-gray-900 p-3 mx-2 rounded-xl shadow-md max-w-lg relative bottom-16 xs:bottom-20 sm:flex-row sm:p-4 sm:bottom-28 smPlus:m-auto smPlus:bottom-36 md:bottom-44 md:px-6 lg:bottom-52 lg:w-4/5 3xl:max-w-xl">
      <MyProfilePage />
    </div>
  );
}

export default AboutMePage;
