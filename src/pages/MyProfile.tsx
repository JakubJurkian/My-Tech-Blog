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
    <div className="bg-gray-900 p-3 mx-2 rounded-xl shadow-md max-w-lg relative bottom-16 smallMobile:bottom-20 mobile:flex-row mobile:p-4 xs:bottom-28 small:m-auto small:bottom-36 medium:bottom-44 medium:px-6 tablet:bottom-52 tablet:w-4/5 largeDesktop:max-w-xl">
      <MyProfilePage />
    </div>
  );
}

export default AboutMePage;
