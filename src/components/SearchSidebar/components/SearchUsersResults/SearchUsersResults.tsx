import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FollowButton } from '@components/FollowButton/FollowButton';
import { UserShortInfo } from '@components/UserShortInfo/UserShortInfo';
import { UserState } from '@store/reducers/userReducer';
import { RootState } from '@store/types';

interface UserResultsProps {
  users: UserState[];
  searchTerm: string;
}

export const SearchUsersResults = ({ users, searchTerm }: UserResultsProps) => {
  const originId = useSelector((state: RootState) => state.user.userId);

  return (
    <div className="user-results">
      {users.map((user) => (
        <Link key={user.userId} to={`/home/user/${user.userId}`}>
          <div className="search-user-results">
            <UserShortInfo
              avatar={user.avatar}
              name={user.name}
              userSlug={user.userSlug}
            />
            {originId !== user.userId && (
              <FollowButton
                searchTerm={searchTerm}
                user={user}
                id={user.userId}
              />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};
