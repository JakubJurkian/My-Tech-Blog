import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import RegisterForm from '../components/RegisterForm';
import useAuth from '../hooks/useAuth';

export default function RegisterPage() {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return navigate('/');
  }, [isAuthenticated, navigate]);

  console.log('register');

  return <RegisterForm />;
}
