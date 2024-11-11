import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Feed } from '@components/Feed/Feed';
import { NotificationPopUp } from '@components/NotificationPopUp/NotificationPopUp';
import { ProfileHead } from '@components/ProfileHead/ProfileHead';
import {
  fetchOtherUserDataError,
  fetchOtherUserDataRequest,
} from '@store/actions/otherUserActions';
import { hideErrorPopUp } from '@store/actions/popUpActions';
import { UserState } from '@store/reducers/userReducer';
import {
  selectOtherUser,
  selectOtherUserError,
  selectUserId,
} from '@store/selectors';
import { userPostsQuery } from '@utils/querys';

import './styles.scss';

export const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectOtherUserError);
  const otherUser = useSelector(selectOtherUser);
  const originId = useSelector(selectUserId);
  const isOriginUser = id === originId;

  const handleClose = useCallback(() => {
    dispatch(hideErrorPopUp());
    dispatch(fetchOtherUserDataError(null));
  }, []);
  useEffect(() => {
    if (isOriginUser) {
      navigate('/profile');
    }
  }, []);
  useEffect(() => {
    if (id) {
      dispatch(fetchOtherUserDataRequest(id));
    }
  }, [id]);

  return (
    <section className="user">
      {otherUser && (
        <>
          <ProfileHead
            user={{ ...(otherUser.otherUser as UserState), userId: id ?? '' }}
            isOriginUser={isOriginUser}
          />
          <Feed query={() => userPostsQuery(id as string)} />
          {error && <NotificationPopUp message={error} onClose={handleClose} />}
        </>
      )}
    </section>
  );
};
