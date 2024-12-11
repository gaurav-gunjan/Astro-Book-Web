import * as actionTypes from '../action-types';
import { put, takeLeading } from 'redux-saga/effects';
import { getAPI, postAPI } from '../../utils/api-function';
import { get_astro_blog, get_astro_blog_category, get_astro_blogs, increment_astro_blog_view_count } from '../../utils/api-routes';

function* getAstroblogCategory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_astro_blog_category);
        console.log("Get Astroblog Category Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_ASTRO_BLOG_CATEGORY, payload: data?.categoryBlog?.reverse() });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astroblog Category Saga Error ::: ", error);
    }
};


function* getAstroblog(action) {
    try {
        const { payload } = action;
        console.log("Get Astroblog Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_astro_blog(payload?.page, payload?.limit, payload?.categoryId, payload?.search));
        console.log("Get Astroblog Saga Response ::: ", data);

        if (data?.success) yield put({ type: actionTypes.SET_ASTRO_BLOG, payload: data });
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Astroblog Saga Error ::: ", error);
    }
};

function* getRecentAstroblog(action) {
    try {
        const { payload } = action;
        console.log("Get Recent Astroblog Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_astro_blog(payload?.page, payload?.limit));
        console.log("Get Recent Astroblog Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_RECENT_ASTRO_BLOG, payload: data?.results });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Recent Astroblog Saga Error ::: ", error);
    }
};

function* incrementAstroBlogViewCount(action) {
    try {
        const { payload } = action;
        console.log("Increment Astro Blog View Count Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(increment_astro_blog_view_count(payload?.blogId));
        console.log("Increment Astro Blog View Count Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.GET_ASTRO_BLOG, payload: null });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get Recent Astroblog Saga Error ::: ", error);
    }
};

export default function* blogSaga() {
    yield takeLeading(actionTypes.GET_ASTRO_BLOG_CATEGORY, getAstroblogCategory);
    yield takeLeading(actionTypes.GET_ASTRO_BLOG, getAstroblog);
    yield takeLeading(actionTypes.GET_RECENT_ASTRO_BLOG, getRecentAstroblog);
    yield takeLeading(actionTypes.INCREMENT_ASTRO_BLOG_VIEW_COUNT, incrementAstroBlogViewCount);
};