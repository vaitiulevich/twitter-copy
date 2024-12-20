import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logoutRequest } from '@store/actions/authActions';
import { selectAuthTimestamp, selectAuthUid } from '@store/selectors';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const nowTime = new Date().getTime();
  const timestamp = useSelector(selectAuthTimestamp);
  const dispatch = useDispatch();

  const isSessionEnd =
    timestamp && timestamp !== undefined && nowTime > +timestamp;
  const user = useSelector(selectAuthUid);

  const isRedirect = !user || isSessionEnd;

  if (isRedirect) {
    dispatch(logoutRequest());
    return <Navigate to="/" />;
  }

  return children;
};
