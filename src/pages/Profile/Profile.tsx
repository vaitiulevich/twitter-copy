import { useSelector } from 'react-redux';
import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { Feed } from '@components/Feed/Feed';
import { ProfileHead } from '@components/ProfileHead/ProfileHead';
import { selectUserId } from '@store/selectors';
import { userPostsQuery } from '@utils/querys';

import './styles.scss';

export const Profile = () => {
  const userId = useSelector(selectUserId);
  return (
    <>
      <ProfileHead />
      <AddPostPanel />
      <h2 className="headline-tweets">Tweets</h2>
      <Feed query={() => userPostsQuery(userId)} />
    </>
  );
};
