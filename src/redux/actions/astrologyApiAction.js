import * as actionTypes from "../action-types";

//! Horoscope
export const getDailyHoroscope = payload => ({
    type: actionTypes.GET_DAILY_HOROSCOPE, payload
});

export const setDailyHoroscope = payload => ({
    type: actionTypes.SET_DAILY_HOROSCOPE, payload
});

export const getMonthlyHoroscope = payload => ({
    type: actionTypes.GET_MONTHLY_HOROSCOPE, payload
});

export const setMonthlyHoroscope = payload => ({
    type: actionTypes.SET_MONTHLY_HOROSCOPE, payload
});

//! Kundli Matching
export const getKundliMatchingBirthDetails = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_BIRTH_DETAILS,
    payload
});

export const setKundliMatchingBirthDetails = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_BIRTH_DETAILS,
    payload
});

export const getKundliMatchingAstroDetails = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_ASTRO_DETAILS,
    payload
});

export const setKundliMatchingAstroDetails = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_ASTRO_DETAILS,
    payload
});

export const getKundliMatchingAshtakootPointsDetails = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_ASHTAKOOT_POINTS_DETAILS,
    payload
});

export const setKundliMatchingAshtakootPointsDetails = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS_DETAILS,
    payload
});

export const getKundliMatchingDashakootPointsDetails = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_DASHAKOOT_POINTS_DETAILS,
    payload
});

export const setKundliMatchingDashakootPointsDetails = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_DASHAKOOT_POINTS_DETAILS,
    payload
});

export const getKundliMatchingManglikReportDetails = payload => ({
    type: actionTypes.GET_KUNDLI_MATCHING_MANGLIK_REPORT_DETAILS,
    payload
});

export const setKundliMatchingManglikReportDetails = payload => ({
    type: actionTypes.SET_KUNDLI_MATCHING_MANGLIK_REPORT_DETAILS,
    payload
});