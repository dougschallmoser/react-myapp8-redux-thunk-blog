import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

// This function fetches all posts, waits, then fetches unique users.
// This function invokes the fetchPosts and fetchUser functions to do so.
// Alternately, you can use memoization to fetch unique users
export const fetchPostsAndUsers = () => {
  return async (dispatch, getState) => {
    await dispatch(fetchPosts());
    // returns an array of unique user id's
    const userIds = _.uniq(_.map(getState().posts, 'userId'))
    userIds.forEach(id => dispatch(fetchUser(id)))
  }
}

export const fetchPosts = () => {
  return async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({ type: 'FETCH_POSTS', payload: response.data })
  }
}

export const fetchUser = (id) => {
  return async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data })
  }
}
