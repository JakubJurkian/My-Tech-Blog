import React, { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '../firebase';
import { authSuccess } from '../store/authSlice';
import { updateEmail, updateName } from '../store/profileSlice';
import useFormValidation from '../hooks/use-form-validation';
import Spinner from './Spinner';

const validateValue = (value: string) => {
  return value.trim() !== '' && value.length < 50;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useFormValidation(validateValue);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useFormValidation(validateValue);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (emailIsValid && passwordIsValid) {
      setIsLoading(true);
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const userId = res.user.uid;

        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        const name = docSnap.data()?.name;

        setIsLoading(false);
        dispatch(authSuccess({ name, email, uid: userId }));
        dispatch(updateName(name));
        dispatch(updateEmail(email));

        emailReset();
        passwordReset();
        navigate('/');
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(
          <div className="text-center">
            <p className="text-red-500 text-lg">
              Your email or password is incorrect.
            </p>
          </div>
        );
      }
    }
  };

  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, 300);

  return (
    <div className="flex flex-col items-center relative bottom-20 xs:bottom-24 sm:bottom-36 smPlus:bottom-36 md:bottom-52 lg:bottom-60 mx-auto sm:px-5 lg:h-screen 2xl:py-0">
      <div className="w-full rounded-lg shadow-md border lg:mt-0 md:max-w-lg 2xl:p-0 bg-gray-900 border-gray-700">
        <div className="p-5 space-y-4 md:p-8">
          <h1 className="text-2xl text-center font-bold tracking-tight lg:text-2xl text-gray-300">
            Login
          </h1>
          <form className="space-y-4" action="#" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="form-label">
                Your email
              </label>
              <input
                id="email"
                value={email}
                type="email"
                name="email"
                placeholder="name@email.com"
                className={`form-input smooth-transition-effect ${
                  emailHasError ? 'form-input-error' : null
                }`}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                required
              />
              {emailHasError && (
                <p className="error-message">Please enter a valid email.</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                value={password}
                type="password"
                name="password"
                placeholder="••••••••"
                className={`form-input smooth-transition-effect ${
                  passwordHasError ? 'form-input-error' : null
                }`}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                required
              />
              {passwordHasError && (
                <p className="error-message">Please enter a valid password.</p>
              )}
            </div>
            {isLoading && <Spinner />}
            {errorMessage}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-500 smooth-transition-effect focus:ring-2 focus:outline-none focus:ring-[#1e40af] font-medium rounded-lg text-base px-5 py-2.5 text-center"
            >
              Login
            </button>
            <p className="text-sm text-gray-300">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium hover:underline text-[#3b82f6]"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
