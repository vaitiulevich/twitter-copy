import { PostState } from '@store/reducers/userReducer';
import * as actions from '@store/types/posts/actionTypes';

export const addPostRequest = (
  postData: PostState & { files?: File[] },
  onClose?: () => void
) =>
  ({
    type: actions.ADD_POST_REQUEST,
    payload: { postData, onClose },
  }) as const;

export const addPostSuccess = (post: PostState) =>
  ({
    type: actions.ADD_POST_SUCCESS,
    payload: post,
  }) as const;

export const addPostFailure = () =>
  ({
    type: actions.ADD_POST_FAILURE,
  }) as const;

export const updatePostLikesRequest = (postId: string, likes: string[]) =>
  ({
    type: actions.UPDATE_POST_LIKES_REQUEST,
    payload: { postId, likes },
  }) as const;

export const updatePostLikesSuccess = () =>
  ({
    type: actions.UPDATE_POST_LIKES_SUCCESS,
  }) as const;

export const updatePostLikesFailure = () =>
  ({
    type: actions.UPDATE_POST_LIKES_FAILURE,
  }) as const;

export const deletePostRequest = (
  id: string,
  ownerId: string,
  userId: string,
  images?: string[]
) =>
  ({
    type: actions.DELETE_POST_REQUEST,
    payload: { id, ownerId, userId, images },
  }) as const;

export const deletePostSuccess = (id: string) =>
  ({
    type: actions.DELETE_POST_SUCCESS,
    payload: id,
  }) as const;

export const deletePostFailure = (error: string) =>
  ({
    type: actions.DELETE_POST_FAILURE,
    payload: error,
  }) as const;

export const fetchPostsRequest = (id: string) =>
  ({
    type: actions.FETCH_POSTS_REQUEST,
    payload: id,
  }) as const;
export const fetchPostsFailure = () =>
  ({
    type: actions.FETCH_POSTS_FAILURE,
  }) as const;
