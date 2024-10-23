import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';
import { Entry } from '@pages/Auth/Entry/Entry';
import { SetPassword } from '@pages/Auth/SetPassword/SetPassword';
import { SignIn } from '@pages/Auth/SignIn/SignIn';
import { SignUp } from '@pages/Auth/SignUp/SignUp';
import { NoPageYet } from '@pages/NoPageYet/NoPageYet';
import { Profile } from '@pages/Profile/Profile';
import { UserAppWrapper } from '@pages/UserAppWrapper/UserAppWrapper';

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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
