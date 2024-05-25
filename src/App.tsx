import { ReactNode, Suspense, lazy, useState } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './store/store';

import RootLayout from './pages/Root';
import useAuthStateChange from './hooks/useAuthStateChange';
import Spinner from './components/Spinner';

const HomePage = lazy(() => import('./pages/Home'));
const RegisterPage = lazy(() => import('./pages/Register'));
const LoginPage = lazy(() => import('./pages/Login'));
const PostPage = lazy(() => import('./pages/Post'));
const NewPostPage = lazy(() => import('./pages/NewPost'));
const MyProfilePage = lazy(() => import('./pages/MyProfile'));
const ErrorPage = lazy(() => import('./pages/Error'));

type AuthCheckerProps = {
  children: ReactNode;
};

const AuthChecker = ({ children }: AuthCheckerProps) => {
  const [loading, setLoading] = useState(true);
  useAuthStateChange(setLoading);
  if (loading) return <Spinner />;

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      { path: 'login', element: <LoginPage /> },
      { path: 'posts/:postId', element: <PostPage /> },
      { path: 'my-profile', element: <MyProfilePage /> },
      { path: 'create-new-post', element: <NewPostPage /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <AuthChecker>
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthChecker>
    </Provider>
  );
}

export default App;
