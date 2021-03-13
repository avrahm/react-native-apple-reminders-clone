/* eslint-disable import/prefer-default-export */

import moment from 'moment';
import { syncDataToFirebase } from './syncData';

export const handleSyncData = syncSettings => dispatch => {
    if (!syncSettings) return null;
    const {
        lastUpdatedTime, lastSyncedTime, userInfo, isLoggedIn, getAllTodos, logoutSync,
    } = syncSettings;
    if (isLoggedIn && userInfo.id !== undefined) {
        const timeDiff = moment(lastUpdatedTime).diff(moment(lastSyncedTime), 'minutes');
        if (timeDiff > 30) {
            dispatch(syncDataToFirebase(getAllTodos, userInfo.id));
        }
    }
    if (logoutSync) {
       dispatch(syncDataToFirebase(getAllTodos, userInfo.id));
        return true;
    }
};
