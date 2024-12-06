import * as actionTypes from "../action-types";
import { put, call, takeLeading, delay } from 'redux-saga/effects';
import { AstrologyAPIRequest } from '../../utils/api-function';
import { toaster } from '../../utils/services/toast-service';
import { get_daily_horoscope, get_daily_tomorrow_horoscope, get_daily_yesterday_horoscope, get_kundli_matching_ashtakoot_points_details, get_kundli_matching_astro_details, get_kundli_matching_birth_details, get_kundli_matching_dashakoot_points_details, get_kundli_matching_manglik_report_details, get_monthly_horoscope, } from '../../utils/api-routes';

//! Horoscope 
function* getDailyHoroscope(action) {
    try {
        const { payload } = action;
        console.log("Get Daily Horoscope Payload ::: ", payload);

        if (payload?.day == 'Today') {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
            yield delay(100);
            const data = yield AstrologyAPIRequest(get_daily_horoscope(payload?.zodiacSign));
            console.log('Get Daily Horoscope Saga Response - Today ::: ', data);

            if (data?.status) yield put({ type: actionTypes.SET_DAILY_HOROSCOPE, payload: data?.prediction });
            else toaster?.warning({ text: data?.error });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

        } else if (payload?.day == 'Tomorrow') {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
            yield delay(100);
            const data = yield AstrologyAPIRequest(get_daily_tomorrow_horoscope(payload?.zodiacSign));
            console.log('Get Daily Horoscope Saga Response - Tomorrow ::: ', data);

            if (data?.status) yield put({ type: actionTypes.SET_DAILY_HOROSCOPE, payload: data?.prediction });
            else toaster?.warning({ text: data?.error });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

        } else {
            yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
            yield delay(100);
            const data = yield AstrologyAPIRequest(get_daily_yesterday_horoscope(payload?.zodiacSign));
            console.log('Get Daily Horoscope Saga Response - Yesterday ::: ', data);

            if (data?.status) yield put({ type: actionTypes.SET_DAILY_HOROSCOPE, payload: data?.prediction });
            else toaster?.warning({ text: data?.error });
            yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Daily Horoscope Saga Error :::', error?.error);
    }
};

function* getMonthlyHoroscope(action) {
    try {
        const { payload } = action;
        console.log("Get Monthly Horoscope Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const data = yield AstrologyAPIRequest(get_monthly_horoscope(payload));
        console.log('Get Monthly Horoscope Saga Response ::: ', data);

        if (data?.status) yield put({ type: actionTypes.SET_MONTHLY_HOROSCOPE, payload: data });
        else toaster?.warning({ text: data?.error });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Monthly Horoscope Saga Error :::', error?.error);
    }
};


//! Kundli Matching
function* getKundliMatchingBirthDetails(action) {
    try {
        const { payload } = action;
        // console.log("Get Kundli Matching Birth Details Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const data = yield AstrologyAPIRequest(get_kundli_matching_birth_details, payload);
        console.log('Get Kundli Matching Birth Details Saga Response ::: ', data);

        if (data) yield put({ type: actionTypes.SET_KUNDLI_MATCHING_BIRTH_DETAILS, payload: data });
        else toaster?.warning({ text: data?.error || data?.msg || data?.error_msg });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Kundli Matching Birth Details Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getKundliMatchingAstroDetails(action) {
    try {
        const { payload } = action;
        // console.log("Get Kundli Matching Astro Details Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const data = yield AstrologyAPIRequest(get_kundli_matching_astro_details, payload);
        console.log('Get Kundli Matching Astro Details Saga Response ::: ', data);

        if (data) yield put({ type: actionTypes.SET_KUNDLI_MATCHING_ASTRO_DETAILS, payload: data });
        else toaster?.warning({ text: data?.error || data?.msg || data?.error_msg });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Kundli Matching Astro Details Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getKundliMatchingAshtakootPointsDetails(action) {
    try {
        const { payload } = action;
        // console.log("Get Kundli Matching Ashtakoot Points Details Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const data = yield AstrologyAPIRequest(get_kundli_matching_ashtakoot_points_details, payload);
        console.log('Get Kundli Matching Ashtakoot Points Details Saga Response ::: ', data);

        if (data) yield put({ type: actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS_DETAILS, payload: data });
        else toaster?.warning({ text: data?.error || data?.msg || data?.error_msg });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Kundli Matching Ashtakoot Points Details Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getKundliMatchingDashakootPointsDetails(action) {
    try {
        const { payload } = action;
        // console.log("Get Kundli Matching Dashakoot Points Details Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const data = yield AstrologyAPIRequest(get_kundli_matching_dashakoot_points_details, payload);
        console.log('Get Kundli Matching Dashakoot Points Details Saga Response ::: ', data);

        if (data) yield put({ type: actionTypes.SET_KUNDLI_MATCHING_DASHAKOOT_POINTS_DETAILS, payload: data });
        else toaster?.warning({ text: data?.error || data?.msg || data?.error_msg });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Kundli Matching Dashakoot Points Details Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getKundliMatchingManglikReportDetails(action) {
    try {
        const { payload } = action;
        // console.log("Get Kundli Matching Manglik Report Details Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const data = yield AstrologyAPIRequest(get_kundli_matching_manglik_report_details, payload);
        console.log('Get Kundli Matching Manglik Report Details Saga Response ::: ', data);

        if (data) yield put({ type: actionTypes.SET_KUNDLI_MATCHING_MANGLIK_REPORT_DETAILS, payload: data });
        else toaster?.warning({ text: data?.msg || data?.error || data?.error_msg });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Kundli Matching Manglik Report Details Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

export default function* astrologyApiSaga() {
    //! Horoscope 
    yield takeLeading(actionTypes?.GET_DAILY_HOROSCOPE, getDailyHoroscope);
    yield takeLeading(actionTypes?.GET_MONTHLY_HOROSCOPE, getMonthlyHoroscope);

    //! Kundli Matching
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_BIRTH_DETAILS, getKundliMatchingBirthDetails);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_ASTRO_DETAILS, getKundliMatchingAstroDetails);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_ASHTAKOOT_POINTS_DETAILS, getKundliMatchingAshtakootPointsDetails);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_DASHAKOOT_POINTS_DETAILS, getKundliMatchingDashakootPointsDetails);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_MANGLIK_REPORT_DETAILS, getKundliMatchingManglikReportDetails);
};