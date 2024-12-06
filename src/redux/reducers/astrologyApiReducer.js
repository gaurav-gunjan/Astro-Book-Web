import * as actionTypes from "../action-types";

const initialState = {
    dailyHoroscopeData: null,
    monthlyHoroscopeData: null,
    kundliMatchingBirthDetailsData: null,
    kundliMatchingAstroDetailsData: null,
    kundliMatchingDashakootPointsDetailsData: null,
    kundliMatchingAshtakootPointsDetailsData: null,
    kundliMatchingManglikReportDetailsData: null
};

const astrologyApiReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        //! Horoscope
        case actionTypes.SET_DAILY_HOROSCOPE:
            return { ...state, dailyHoroscopeData: payload };

        case actionTypes.SET_MONTHLY_HOROSCOPE:
            return { ...state, monthlyHoroscopeData: payload };

        //! Kundli Matching
        case actionTypes.SET_KUNDLI_MATCHING_BIRTH_DETAILS:
            return { ...state, kundliMatchingBirthDetailsData: payload };

        case actionTypes.SET_KUNDLI_MATCHING_ASTRO_DETAILS:
            return { ...state, kundliMatchingAstroDetailsData: payload };

        case actionTypes.SET_KUNDLI_MATCHING_DASHAKOOT_POINTS_DETAILS:
            return { ...state, kundliMatchingDashakootPointsDetailsData: payload };

        case actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS_DETAILS:
            return { ...state, kundliMatchingAshtakootPointsDetailsData: payload };

        case actionTypes.SET_KUNDLI_MATCHING_MANGLIK_REPORT_DETAILS:
            return { ...state, kundliMatchingManglikReportDetailsData: payload };

        default:
            return state;
    }
};

export default astrologyApiReducer;