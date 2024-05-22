import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './store/store';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import PostPage from './pages/Post';
import LoginPage from './pages/Login';
import NewPostPage from './pages/NewPost';
import RegisterPage from './pages/Register';
import MyProfilePage from './pages/MyProfile';
import Spinner from './components/Spinner';
import useAuthStateChange from './hooks/useAuthStateChange';

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
      { path: 'create-new-post', element: <NewPostPage /> },
      { path: 'my-profile', element: <MyProfilePage /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <AuthChecker>
        <RouterProvider router={router} />
      </AuthChecker>
    </Provider>
  );
}

export default App;
