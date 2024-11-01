import { useSelector } from 'react-redux';
import { FollowButton } from '@components/FollowButton/FollowButton';
import { UserShortInfo } from '@components/UserShortInfo/UserShortInfo';
import { UserSearch } from '@store/reducers/searchReducer';
import { RootState } from '@store/types';

interface UserResultsProps {
  users: UserSearch[];
}

export const SearchUsersResults = ({ users }: UserResultsProps) => {
  const originId = useSelector((state: RootState) => state.user.userId);

  return (
    <>
      {users.map((user) => (
        <div className="search-user-results" key={user.id}>
          <UserShortInfo
            avatar={user.avatar}
            name={user.name}
            userSlug={user.userSlug}
            navTo={`/home/user/${user.id}`}
          />
          {originId !== `${user.id}` && <FollowButton id={`${user.id}`} />}
        </div>
      ))}
    </>
  );
};
