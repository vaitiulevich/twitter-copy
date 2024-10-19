import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '@store/types';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};
