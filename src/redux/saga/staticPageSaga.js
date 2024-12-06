import { put, takeLeading } from 'redux-saga/effects';
import * as actionTypes from '../action-types';
import { get_privacy_policy, get_terms_and_conditions } from '../../utils/api-routes';
import { getAPI, postAPI } from "../../utils/api-function";

function* getTermsAndCondition(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_terms_and_conditions, payload);
        console.log("Get Terms & Condition Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_TERMS_AND_CONDITION, payload: data?.termsAndCondition?.description });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Terms & Condition Saga Error ::: ", error);
    }
}

function* getPrivacyPolicy() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_privacy_policy);
        console.log("Get Privacy Policy Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_PRIVACY_POLICY, payload: data?.privacyPolicy?.description });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Privacy Policy Saga Error ::: ", error);
    }
}

export default function* staticPageSaga() {
    yield takeLeading(actionTypes?.GET_TERMS_AND_CONDITION, getTermsAndCondition);
    yield takeLeading(actionTypes?.GET_PRIVACY_POLICY, getPrivacyPolicy);
}