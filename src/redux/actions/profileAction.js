import * as actionTypes from "../action-types";

//! Profile
export const createKundliMatchingProfile = payload => ({
    type: actionTypes.CREATE_KUNDLI_MATCHING_PROFILE, payload
});

export const getKundliMatchingProfile = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_PROFILE, payload
});

export const setKundliMatchingProfile = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_PROFILE, payload
});

export const getKundliMatchingProfileById = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_PROFILE_BY_ID, payload
});

export const setKundliMatchingProfileById = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_PROFILE_BY_ID, payload
});