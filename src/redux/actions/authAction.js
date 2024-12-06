import * as actionTypes from "../action-types";

export const customerLogin = (payload) => ({
    type: actionTypes.CUSTOMER_LOGIN, payload,
});

export const customerLoginOtp = (payload) => ({
    type: actionTypes.CUSTOMER_LOGIN_OTP, payload,
});

export const customerUpdateProfile = (payload) => ({
    type: actionTypes.CUSTOMER_UPDATE_PROFILE, payload,
});

export const customerChangePicture = (payload) => ({
    type: actionTypes.CUSTOMER_CHANGE_PICTURE, payload,
});

export const customerLoginInputField = (payload) => ({
    type: actionTypes.CUSTOMER_LOGIN_INPUT_FIELD, payload,
});

export const astrologerLogin = (payload) => ({
    type: actionTypes.ASTROLOGER_LOGIN, payload,
});

export const userLogout = (payload) => ({
    type: actionTypes.USER_LOGOUT, payload,
});