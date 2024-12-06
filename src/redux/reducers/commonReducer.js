import * as actionTypes from "../action-types";

const initialState = {
    isLoading: false,
    socketConnectionStatus: false
};

const commonReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_IS_LOADING:
            return { ...state, isLoading: payload, };

        case actionTypes.SET_SOCKET_CONNECTION_STATUS:
            return { ...state, socketConnectionStatus: payload };

        default: {
            return state;
        }
    }
};

export default commonReducer;