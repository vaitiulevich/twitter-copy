import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';
import { Entry } from '@pages/Auth/Entry/Entry';
import { SetPassword } from '@pages/Auth/SetPassword/SetPassword';
import { SignIn } from '@pages/Auth/SignIn/SignIn';
import { SignUp } from '@pages/Auth/SignUp/SignUp';
import { Profile } from '@pages/Profile/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Entry />,
  },
  {
    path: '/login',
    element: <Entry />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/sign-up/set-password',
    element: <SetPassword />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
