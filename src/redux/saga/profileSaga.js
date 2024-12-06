import * as actionTypes from "../action-types";
import { put, call, takeLeading } from 'redux-saga/effects';
import { postAPI } from '../../utils/api-function';
import { create_kundli_matching_profile, get_kundli_matching_profile, get_kundli_matching_profile_by_id, } from '../../utils/api-routes';
import { toaster } from "../../utils/services/toast-service";

function* createKundliMatchingProfile(action) {
    try {
        const { payload } = action;
        console.log("Create Kundli Matching Profile Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(create_kundli_matching_profile, payload?.data);
        console.log("Create Kundli Matching Profile Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_KUNDLI_MATCHING_PROFILE, payload: data?.results });
            toaster?.success({ text: 'Profile created successfully' });
            if (payload?.onComplete && data?.results?._id) yield call(payload.onComplete, data.results._id);
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        toaster?.error({ text: 'Failed to create profile' });
        console.log("Create Kundli Matching Profile Saga Error ::: ", error);
    }
};

function* getKundliMatchingProfile(action) {
    try {
        const { payload } = action;
        console.log("Get Kundli Matching Profile Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_kundli_matching_profile, payload);
        console.log("Get Kundli Matching Profile Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_KUNDLI_MATCHING_PROFILE, payload: data?.data });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Kundli Matching Profile Saga Error ::: ", error);
    }
};


function* getKundliMatchingProfileById(action) {
    try {
        const { payload } = action;
        console.log("Get Kundli Matching Profile By Id Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_kundli_matching_profile_by_id, payload);
        console.log("Get Kundli Matching Profile By Id Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_KUNDLI_MATCHING_PROFILE_BY_ID, payload: data?.data });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Kundli Matching Profile By Id Saga Error ::: ", error);
    }
};


export default function* profileSaga() {
    yield takeLeading(actionTypes.CREATE_KUNDLI_MATCHING_PROFILE, createKundliMatchingProfile);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_PROFILE, getKundliMatchingProfile);
    yield takeLeading(actionTypes.GET_KUNDLI_MATCHING_PROFILE_BY_ID, getKundliMatchingProfileById);
};