import { put, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../action-types'
import { getAPI, postAPI } from '../../utils/api-function'
import { get_astro_blogs } from '../../utils/api-routes'
import { api_urls } from '../../utils/api-urls'


function* getAstroBlogs(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        const response = yield postAPI(get_astro_blogs, {
            blogCategory: payload
        }
        )

        if (response?.data) {
            yield put({ type: actionTypes.SET_ASTRO_BLOGS, payload: response?.data?.reverse() })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}




export default function* blogSaga() {

    yield takeLeading(actionTypes.GET_ASTRO_BLOGS, getAstroBlogs)
}