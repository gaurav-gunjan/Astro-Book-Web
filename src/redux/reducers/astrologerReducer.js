import * as actionTypes from "../action-types";

const initialState = {
    astrologerData: [],
    astrologerDataById: [],
    astrologerReviewDataById: [],
};

const astrologerReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_ASTROLOGER: {
            return {
                ...state,
                astrologerData: payload,
            };
        }
        case actionTypes.SET_ASTROLOGER_BY_ID: {
            return {
                ...state,
                astrologerDataById: payload,
            };
        }
        case actionTypes.SET_ASTROLOGER_REVIEW_BY_ID: {
            return {
                ...state,
                astrologerReviewDataById: payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default astrologerReducer;
