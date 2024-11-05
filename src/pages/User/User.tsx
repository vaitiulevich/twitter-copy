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
import { selectOtherUser, selectUserId } from '@store/selectors';
import { RootState } from '@store/types';
import { userPostsQuery } from '@utils/querys';

import './styles.scss';

export const User = () => {
  const { id } = useParams();
  const originId = useSelector(selectUserId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.otherUser.error);

  const handleClose = useCallback(() => {
    dispatch(hideErrorPopUp());
    dispatch(fetchOtherUserDataError(null));
  }, []);
  useEffect(() => {
    if (id === originId) {
      navigate('/profile');
    }
  }, []);
  useEffect(() => {
    if (id) {
      dispatch(fetchOtherUserDataRequest(id));
    }
  }, [id]);

  const otherUser = useSelector(selectOtherUser);

  return (
    <section className="user">
      {otherUser && (
        <>
          <ProfileHead
            user={{ ...otherUser, userId: id ?? '' }}
            isOriginUser={false}
          />
          <Feed query={() => userPostsQuery(id as string)} />
          {error && <NotificationPopUp message={error} onClose={handleClose} />}
        </>
      )}
    </section>
  );
};
