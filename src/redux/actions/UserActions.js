// action types
export const SET_USER = 'SET_USER';
export const SET_LAST_SYNC = 'SET_LAST_SYNC';
export const LOGOUT = 'LOGOUT';

// action creators
export const setUser = user => dispatch => dispatch({ type: SET_USER, payload: user });
export const setLastSync = timestamp => dispatch => dispatch({ type: SET_LAST_SYNC, payload: timestamp });
export const logout = () => dispatch => dispatch({ type: LOGOUT });
