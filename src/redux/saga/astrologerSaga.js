import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { put, call, takeLeading, delay } from 'redux-saga/effects';
import { getAPI, postAPI } from '../../utils/api-function';
import { get_astrologer, get_astrologer_by_id, get_astrologer_main_expertise, get_astrologer_review_by_id, get_astrologer_skill } from '../../utils/api-routes';
import { toaster } from '../../utils/services/toast-service';

function* getAstrologer(action) {
    try {
        const { payload } = action;
        console.log("Get Astrologer Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_astrologer, payload);
        console.log('Get Astrologer Saga Response ::: ', data);

        if (data?.success) yield put({ type: actionTypes.SET_ASTROLOGER, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astrologer Saga Error ::: ", error);
    }
};

function* getAstrologerById(action) {
    try {
        const { payload } = action;

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        yield delay(100);
        const { data } = yield postAPI(get_astrologer_by_id, payload);

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTROLOGER_BY_ID, payload: data?.astrologer });
        } else {
            toaster.info({ text: data?.message })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        toaster.error({ text: error?.response?.data?.message })
    }
};

function* getAstrologerReviewById(action) {
    try {
        const { payload } = action;

        const { data } = yield postAPI(get_astrologer_review_by_id, payload);
        if (data?.success) yield put({ type: actionTypes.SET_ASTROLOGER_REVIEW_BY_ID, payload: data?.reviews?.reverse() });

    } catch (error) {
        yield put({ type: actionTypes.SET_ASTROLOGER_REVIEW_BY_ID, payload: [] });
    }
};

function* getAstrologerSkill(action) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_astrologer_skill);
        console.log('Get Astrologer Skill Saga Response ::: ', data);

        if (data?.success) yield put({ type: actionTypes.SET_ASTROLOGER_SKILL, payload: data?.skills });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astrologer Skill Saga Error ::: ", error);
    }
};


function* getAstrologerMainExpertise(action) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_astrologer_main_expertise);
        console.log('Get Astrologer MainExpertise Saga Response ::: ', data);

        if (data?.success) yield put({ type: actionTypes.SET_ASTROLOGER_MAIN_EXPERTISE, payload: data?.mainExpertise });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astrologer MainExpertise Saga Error ::: ", error);
    }
};

export default function* astrologerSaga() {
    yield takeLeading(actionTypes?.GET_ASTROLOGER, getAstrologer);
    yield takeLeading(actionTypes?.GET_ASTROLOGER_BY_ID, getAstrologerById);
    yield takeLeading(actionTypes?.GET_ASTROLOGER_REVIEW_BY_ID, getAstrologerReviewById);
    yield takeLeading(actionTypes?.GET_ASTROLOGER_SKILL, getAstrologerSkill);
    yield takeLeading(actionTypes?.GET_ASTROLOGER_MAIN_EXPERTISE, getAstrologerMainExpertise);
};