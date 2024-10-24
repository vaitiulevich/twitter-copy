import { createSelector } from 'reselect';

import { RootState } from './types';

const selectPost = (state: RootState) => state.post;
export const selectPostLoad = createSelector(
  [selectPost],
  (post) => post.loading
);

const selectTheme = (state: RootState) => state.theme;
export const selectThemeType = createSelector(
  [selectTheme],
  (theme) => theme.theme
);

const selectUser = (state: RootState) => state.user;
export const selectUserSelector = createSelector([selectUser], (user) => {
  const { posts, ...userWithoutPosts } = user;
  return userWithoutPosts;
});
export const selectUserId = createSelector([selectUser], (user) => user.userId);
export const selectUserLoad = createSelector(
  [selectUser],
  (user) => user.loading
);
export const selectUserError = createSelector(
  [selectUser],
  (user) => user.error
);
export const selectUserPosts = createSelector(
  [selectUser],
  (user) => user.posts
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
