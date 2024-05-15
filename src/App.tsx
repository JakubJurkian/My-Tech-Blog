import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './store/store';

import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import PostPage from './pages/Post';
import NewPostPage from './pages/NewPost';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MyProfilePage from './pages/MyProfile';
import RootLayout from './pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'register', element: <RegisterPage /> },
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
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
