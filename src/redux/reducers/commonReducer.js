import * as actionTypes from "../action-types";

const initialState = {
    isLoading: false,
    socketConnectionStatus: false,
    isdownloadOurAppModalOpen: false,
};

const commonReducer = (state = initialState, actions) => {
    const { payload, type } = actions;
    // console.log("Type ::: ", type);

    switch (type) {
        case actionTypes.SET_IS_LOADING:
            return { ...state, isLoading: payload, };

        case actionTypes.SET_SOCKET_CONNECTION_STATUS:
            return { ...state, socketConnectionStatus: payload };

        case actionTypes?.OPEN_DOWNLOAD_OUR_APP_MODAL:
            return { ...state, isdownloadOurAppModalOpen: true };

        case actionTypes?.CLOSE_DOWNLOAD_OUR_APP_MODAL:
            return { ...state, isdownloadOurAppModalOpen: false };

        default: {
            return state;
        }
    }
};

export default commonReducer;