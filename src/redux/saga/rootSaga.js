import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import userSaga from "./userSaga";
import profileSaga from "./profileSaga";
import astrologerSaga from "./astrologerSaga";
import chatSaga from "./chatSaga";
import kundliSaga from "./kundliSaga";
import astrologyApiSaga from "./astrologyApiSaga";
import ecommerceSaga from "./ecommerceSaga";
import blogSaga from "./blogSaga";
import staticPageSaga from "./staticPageSaga";

export default function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        profileSaga(),
        astrologerSaga(),
        chatSaga(),
        kundliSaga(),
        astrologyApiSaga(),
        ecommerceSaga(),
        blogSaga(),
        staticPageSaga(),
    ])
};