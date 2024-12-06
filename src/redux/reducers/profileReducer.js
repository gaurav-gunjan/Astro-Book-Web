import * as actionTypes from "../action-types";

const initialState = {
    kundliMatchingProfileData: null,
    kundliMatchingProfileByIdData: null,
};

const profileReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        //! Kundli Matching Profiles
        case actionTypes.SET_KUNDLI_MATCHING_PROFILE:
            return { ...state, kundliMatchingProfileData: payload };

        case actionTypes.SET_KUNDLI_MATCHING_PROFILE_BY_ID:
            return { ...state, kundliMatchingProfileByIdData: payload };

        default:
            return state;
    }
};

export default profileReducer;