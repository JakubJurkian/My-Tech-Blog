import React, { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../firebase';
import useFormValidation from '../hooks/use-form-validation';
import { updateEmail, updateName } from '../store/profileSlice';
import { authSuccess } from '../store/authSlice';
import PasswordRequirements from './PasswordRequirements';
import Spinner from './Spinner';

const errorText = (value: string) => {
  if (value === 'confirmPassword') {
    return <p className="error-message">your passwords do not fit.</p>;
  } else {
    return <p className="error-message">Please enter a valid {value}.</p>;
  }
};

export default function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState<ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateName = (value: string) => {
    return value.trim() !== '';
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value);
  };

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(value);
  };

  const validateConfirmPassword = (value: string) => {
    return value === password;
  };

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useFormValidation(validateName);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useFormValidation(validateEmail);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useFormValidation(validatePassword);

  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: confirmPasswordReset,
  } = useFormValidation(validateConfirmPassword);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid &&
      password === confirmPassword
    ) {
      setIsLoading(true);
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const userId = res.user.uid;
        await setDoc(doc(db, 'users', userId), {
          name,
          email,
          password,
        });

        setIsLoading(false);
        dispatch(authSuccess({ name, email, uid: userId }));
        dispatch(updateName(name));
        dispatch(updateEmail(email));

        nameReset();
        emailReset();
        passwordReset();
        confirmPasswordReset();
        navigate('/');
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(
          <div className="text-center">
            <p className="text-red-500 text-lg">This email already exists.</p>
          </div>
        );
      }
    }
  };

  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, 300);
  return (
    <>
      <div className="flex flex-col items-center relative bottom-20 xs:bottom-28 sm:bottom-36 smPlus:bottom-44 md:bottom-52 lg:bottom-64 mx-auto smPlus:px-5 lg:h-screen 2xl:py-0">
        <div className="w-full rounded-lg shadow-md border md:mt-0 md:max-w-lg 3xl:p-0 bg-gray-900 border-gray-700">
          <div className="p-5 space-y-4 md:p-8">
            <h1 className="text-2xl text-center font-bold tracking-tight lg:text-2xl text-gray-300">
              Create an Account
            </h1>
            <form className="space-y-4" action="#" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className={`form-input smooth-transition-effect ${
                    nameHasError ? 'form-input-error' : null
                  }`}
                  required
                />
                {nameHasError && errorText('name')}
              </div>
              <div>
                <label htmlFor="email" className="form-label">
                  Your email
                </label>
                <input
                  id="email"
                  value={email}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  type="email"
                  name="email"
                  placeholder="name@email.com"
                  className={`form-input smooth-transition-effect ${
                    emailHasError ? 'form-input-error' : null
                  }`}
                  required
                />
                {emailHasError && errorText('email')}
              </div>
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className={`form-input smooth-transition-effect ${
                    passwordHasError ? 'form-input-error' : null
                  }`}
                  required
                />
                {passwordHasError && errorText('password')}
                <PasswordRequirements />
              </div>
              <div>
                <label htmlFor="confirm-password" className="form-label">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={confirmPasswordChangeHandler}
                  onBlur={confirmPasswordBlurHandler}
                  type="password"
                  name="confirm-password"
                  placeholder="••••••••"
                  className={`form-input smooth-transition-effect ${
                    confirmPasswordHasError ? 'form-input-error' : null
                  }`}
                  required
                />
                {confirmPasswordHasError && errorText('confirmPassword')}
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-300">
                    I accept the{' '}
                    <a
                      className="font-medium hover:underline text-[#3b82f6]"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {isLoading && <Spinner />}
              {errorMessage}
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-500 smooth-transition-effect focus:ring-2 focus:outline-none focus:ring-[#1e40af] font-medium rounded-lg text-lg px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium hover:underline text-[#3b82f6]"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
