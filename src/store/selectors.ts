import { createSelector } from 'reselect';

import { RootState } from './types';

const selectTheme = (state: RootState) => state.theme;
export const selectThemeType = createSelector(
  [selectTheme],
  (theme) => theme.theme
);

const selectPosts = (state: RootState) => state.posts;
export const selectPostLoad = createSelector(
  [selectPosts],
  (post) => post.loading
);
export const selectUserPosts = createSelector(
  [selectPosts],
  (post) => post.posts
);
export const selectPostById = createSelector(
  [selectPosts, (state: RootState, postId: string) => postId],
  (post, postId) => post.posts.find((p) => p.id === postId)
);

const selectUser = (state: RootState) => state.user;
export const selectUserSelector = createSelector([selectUser], (user) => user);
export const selectUserId = createSelector([selectUser], (user) => user.userId);
export const selectUserLoad = createSelector(
  [selectUser],
  (user) => user.loading
);
export const selectUserError = createSelector(
  [selectUser],
  (user) => user.error
);
export const selectUserStatus = createSelector(
  [selectUser],
  (user) => user.status
);

const selectAuth = (state: RootState) => state.auth;
export const selectAuthTimestamp = createSelector(
  [selectAuth],
  (auth) => auth.endSessionTimestamp
);
export const selectAuthUid = createSelector([selectAuth], (auth) => auth.uid);
export const selectAuthError = createSelector(
  [selectAuth],
  (auth) => auth.error
);
export const selectAuthUser = createSelector([selectAuth], (auth) => auth.user);
export const selectAuthLoad = createSelector(
  [selectAuth],
  (auth) => auth.loading
);

const otherUser = (state: RootState) => state.otherUser;

export const selectOtherUser = createSelector(
  [otherUser],
  (user) => user.otherUser
);

export const selectOtherUserLoad = createSelector(
  [otherUser],
  (user) => user.loading
);
export const isUserFollowing = createSelector(
  [otherUser, (state: RootState, userId: string) => userId],
  (user, userId) => {
    console.log(user.otherUser);
    console.log(userId);
    return user?.otherUser?.followers.includes(userId);
  }
);
