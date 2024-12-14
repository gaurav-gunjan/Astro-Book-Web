import * as actionTypes from "../action-types";

export const getAstrologer = payload => ({
    type: actionTypes.GET_ASTROLOGER, payload
});

export const setAstrolosr = payload => ({
    type: actionTypes.SET_ASTROLOGER, payload
});

export const getAstrologerById = payload => ({
    type: actionTypes.GET_ASTROLOGER_BY_ID, payload
});

export const setAstrologerById = payload => ({
    type: actionTypes.SET_ASTROLOGER_BY_ID, payload
});


export const getAstrologerReviewById = payload => ({
    type: actionTypes.GET_ASTROLOGER_REVIEW_BY_ID, payload
});

export const setAstrologerReviewById = payload => ({
    type: actionTypes.SET_ASTROLOGER_REVIEW_BY_ID, payload
});

export const getAstrologerSkill = payload => ({
    type: actionTypes.GET_ASTROLOGER_SKILL, payload
});

export const setAstrologerSkill = payload => ({
    type: actionTypes.SET_ASTROLOGER_SKILL, payload
});

export const getAstrologerMainExpertise = payload => ({
    type: actionTypes.GET_ASTROLOGER_MAIN_EXPERTISE, payload
});

export const setAstrologerMainExpertise = payload => ({
    type: actionTypes.SET_ASTROLOGER_MAIN_EXPERTISE, payload
});