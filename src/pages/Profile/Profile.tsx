import { AddPostPanel } from '@components/AddPostPanel/AddPostPanel';
import { Feed } from '@components/Feed/Feed';
import { ProfileHead } from '@components/ProfileHead/ProfileHead';

import './styles.scss';

export const Profile = () => {
  return (
    <>
      <ProfileHead />
      <AddPostPanel />
      <h2 className="headline-tweets">Tweets</h2>
      <Feed />
    </>
  );
};
