// action types
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

// action creators
export const setUser = user => dispatch => dispatch({ type: SET_USER, payload: user });
export const logout = () => dispatch => dispatch({ type: LOGOUT });
