import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logoutRequest } from '@store/actions/authActions';
import { selectAuthTimestamp, selectAuthUid } from '@store/selectors';
import { checkAuthentication } from '@utils/checkAuthentication';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const nowTime = new Date().getTime();
  const timestamp = useSelector(selectAuthTimestamp);
  const dispatch = useDispatch();

  const isSessionEnd = timestamp && nowTime > +timestamp;
  const isAuth = checkAuthentication();
  const user = useSelector(selectAuthUid);

  if (!user || isSessionEnd || isSessionEnd === undefined) {
    dispatch(logoutRequest());
    return <Navigate to="/" />;
  }

  return children;
};
