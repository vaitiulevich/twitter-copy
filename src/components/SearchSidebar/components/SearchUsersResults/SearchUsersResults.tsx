import { useSelector } from 'react-redux';
import { FollowButton } from '@components/FollowButton/FollowButton';
import { FollowButtonSearch } from '@components/FollowButton/FollowButtonSearch';
import { UserShortInfo } from '@components/UserShortInfo/UserShortInfo';
import { UserSearch } from '@store/reducers/searchReducer';
import { UserState } from '@store/reducers/userReducer';
import { RootState } from '@store/types';

interface UserResultsProps {
  users: UserState[];
  searchTerm: string;
}

export const SearchUsersResults = ({ users, searchTerm }: UserResultsProps) => {
  const originId = useSelector((state: RootState) => state.user.userId);

  return (
    <>
      {users.map((user) => (
        <div className="search-user-results" key={user.userId}>
          <UserShortInfo
            avatar={user.avatar}
            name={user.name}
            userSlug={user.userSlug}
            navTo={`/home/user/${user.userId}`}
          />
          {originId !== user.userId && (
            <FollowButton
              searchTerm={searchTerm}
              user={user}
              id={user.userId}
            />
          )}
        </div>
      ))}
    </>
  );
};
