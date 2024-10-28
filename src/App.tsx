import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import { HomePageWrapper } from '@components/HomePageWrapper/HomePageWrapper';
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';
import { Entry } from '@pages/Auth/Entry/Entry';
import { SetPassword } from '@pages/Auth/SetPassword/SetPassword';
import { SignIn } from '@pages/Auth/SignIn/SignIn';
import { SignUp } from '@pages/Auth/SignUp/SignUp';
import { Home } from '@pages/Home/Home';
import { NoPageYet } from '@pages/NoPageYet/NoPageYet';
import { PostPage } from '@pages/PostPage/PostPage';
import { Profile } from '@pages/Profile/Profile';
import { Settings } from '@pages/Settings/Settings';
import { User } from '@pages/User/User';
import { UserAppWrapper } from '@pages/UserAppWrapper/UserAppWrapper';
import { selectThemeType } from '@store/selectors';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Entry />
      </ErrorBoundary>
    ),
  },
  {
    path: '*',
    element: (
      <ErrorBoundary>
        <NoPageYet />
      </ErrorBoundary>
    ),
  },
  {
    path: '/login',
    element: (
      <ErrorBoundary>
        <Entry />
      </ErrorBoundary>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <ErrorBoundary>
        <SignUp />
      </ErrorBoundary>
    ),
  },
  {
    path: '/sign-up/set-password',
    element: (
      <ErrorBoundary>
        <SetPassword />
      </ErrorBoundary>
    ),
  },
  {
    path: '/sign-in',
    element: (
      <ErrorBoundary>
        <SignIn />
      </ErrorBoundary>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <UserAppWrapper />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'home',
        element: <HomePageWrapper />,
        children: [
          { path: '/home', element: <Home /> },
          { path: 'posts/:id', element: <PostPage /> },
          { path: 'user/:id', element: <User /> },
        ],
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
]);

const App = () => {
  const theme = useSelector(selectThemeType);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
  return <RouterProvider router={router} />;
};

export default App;
