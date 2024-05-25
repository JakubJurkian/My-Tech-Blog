import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../store/store';
import NewPost from '../components/NewPost';

function NewPostPage() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const email = useSelector((state: RootState) => state.profile.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || email !== 'kuba.jur03@gmail.com') navigate('/');
  }, [isLoggedIn, email, navigate]);

  console.log('new-post');

  return <NewPost />;
}

export default NewPostPage;
