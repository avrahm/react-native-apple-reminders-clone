import update from 'immutability-helper';

//immutability-helper
//https://reactjs.org/docs/update.html

import { SET_USER, LOGOUT } from '../actions/UserActions'

//create the initial state of the app
const initialUserState = {
    isLoggedIn: false,
    userInfo: []
}

const userReducer = (state = initialUserState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = update(state, {
                isLoggedIn: { $set: true },
                $merge: { userInfo: action.payload }
            })
            console.log('newstate', newState);
            return {
                ...newState
            };
        case LOGOUT:
            newState = update(state, {
                isLoggedIn: { $set: false },
                $merge: { userInfo: '' }
            })
            return {
                ...newState
            };
    }
    return state;
}

export default userReducer;