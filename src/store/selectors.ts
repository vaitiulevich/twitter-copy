import { createSelector } from 'reselect';

import { RootState } from './types';

export const selectTheme = (state: RootState) => state.theme;

export const selectPosts = (state: RootState) => state.posts;

export const selectPostLoad = (state: RootState) => state.posts.loading;
export const selectPostSelected = (state: RootState) => state.posts.selectPost;

export const selectIsMorePost = (state: RootState) => state.posts.isMorePosts;
export const selectUserPosts = (state: RootState) => state.posts;
export const selectPostsLength = (state: RootState) => state.posts.posts.length;
export const selectPostById = createSelector(
  [selectPosts, (state: RootState, postId: string) => postId],
  (post, postId) => post.posts.find((p) => p.id === postId)
);

export const selectUserSelector = (state: RootState) => state.user;
export const selectUserId = (state: RootState) => state.user.userId;
export const selectUserLoad = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserStatus = (state: RootState) => state.user.status;

export const selectAuthTimestamp = (state: RootState) =>
  state.auth.endSessionTimestamp;
export const selectAuthUid = (state: RootState) => state.auth.uid;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthLoad = (state: RootState) => state.auth.loading;
export const selectAuthToSetPassword = (state: RootState) =>
  state.auth.navigateToSetPassword;

const otherUser = (state: RootState) => state.otherUser;

export const selectOtherUser = (state: RootState) => state.otherUser;
export const selectOtherUserFollowers = (state: RootState) =>
  state.otherUser.otherUser?.followers;

export const selectOtherUserLoad = (state: RootState) =>
  state.otherUser.loading;
export const selectOtherUserError = (state: RootState) => state.otherUser.error;
export const isUserFollowing = createSelector(
  [otherUser, (state: RootState, userId: string) => userId],
  (user, userId) => {
    return user?.otherUser?.followers.includes(userId);
  }
);

export const selectSearchLoad = (state: RootState) => state.search.loading;

export const selectSearchUsers = (state: RootState) => state.search.users;

export const selectSearchPosts = (state: RootState) => state.search.posts;
