/* eslint-disable default-case */
import update from 'immutability-helper';

// immutability-helper
// https://reactjs.org/docs/update.html

import { SET_USER, LOGOUT, SET_LAST_SYNC } from '../actions/UserActions';

// create the initial state of the app
const initialUserState = {
    isLoggedIn: false,
    lastSyncedAt: '',
    userInfo: [],
};

const userReducer = (state = initialUserState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = update(state, {
                isLoggedIn: { $set: true },
                $merge: { userInfo: action.payload },
            });
            return {
                ...newState,
            };
        case SET_LAST_SYNC:
            newState = update(state, {
                lastSyncedAt: { $set: action.payload },
            });
            return {
                ...newState,
            };
        case LOGOUT:
            newState = update(state, {
                isLoggedIn: { $set: false },
                $merge: { userInfo: [] },
            });
            return {
                ...newState,
            };
    }
    return state;
};

export default userReducer;
