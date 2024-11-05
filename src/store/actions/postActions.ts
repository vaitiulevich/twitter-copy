import { PostState } from '@store/reducers/postReducer';
import * as actions from '@store/types/posts/actionTypes';
import { DocumentData, Query } from 'firebase/firestore';

export const loadMorePosts = (count: number) =>
  ({
    type: actions.LOAD_MORE_POSTS,
    payload: count,
  }) as const;

export const setIsMorePosts = (isMorePosts: boolean) =>
  ({
    type: actions.SET_IS_MORE_POSTS,
    payload: isMorePosts,
  }) as const;
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

export const addPostFailure = (error: string | null) =>
  ({
    type: actions.ADD_POST_FAILURE,
    payload: error,
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

export const updatePostLikesFailure = (error: string | null) =>
  ({
    type: actions.UPDATE_POST_LIKES_FAILURE,
    payload: error,
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

export const fetchPostsRequest = (
  id: string,
  query: () => Query<DocumentData, DocumentData>
) =>
  ({
    type: actions.FETCH_POSTS_REQUEST,
    payload: { id, query },
  }) as const;

export const fetchPostsFailure = (error: string | null) =>
  ({
    type: actions.FETCH_POSTS_FAILURE,
    payload: error,
  }) as const;
export const fetchPostsSuccess = (
  posts: PostState[],
  totalUserPosts?: number
) =>
  ({
    type: actions.FETCH_POSTS_SUCCESS,
    payload: { posts, totalUserPosts },
  }) as const;

export const getPostRequest = (id: string) =>
  ({
    type: actions.GET_POST_REQUEST,
    payload: id,
  }) as const;
export const getPostSuccess = (post: PostState) =>
  ({
    type: actions.GET_POST_SUCCESS,
    payload: post,
  }) as const;
export const getPostFailure = (error: string | null) =>
  ({
    type: actions.GET_POST_FAILURE,
    payload: error,
  }) as const;
