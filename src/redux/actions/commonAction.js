import * as actionTypes from '../action-types';

export const setIsLoading = payload => ({
    type: actionTypes.SET_IS_LOADING, payload
});

export const setSocketConnectionStatus = payload => ({
    type: actionTypes.SET_SOCKET_CONNECTION_STATUS, payload
});