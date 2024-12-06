import * as actionTypes from '../action-types'

export const getAstroBlogs = payload => ({
    type: actionTypes.GET_ASTRO_BLOGS,
    payload,
})

export const setAstroBlogs = payload => ({
    type: actionTypes.SET_ASTRO_BLOGS,
    payload,
})