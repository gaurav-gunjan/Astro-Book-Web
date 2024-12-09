import * as actionTypes from '../action-types'

export const getAstroblogCategory = payload => ({
    type: actionTypes.GET_ASTRO_BLOG_CATEGORY, payload
});

export const setAstroblogCategory = payload => ({
    type: actionTypes.SET_ASTRO_BLOG_CATEGORY, payload
});

export const getAstroblog = payload => ({
    type: actionTypes.GET_ASTRO_BLOG, payload
});

export const setAstroblog = payload => ({
    type: actionTypes.SET_ASTRO_BLOG, payload
});

export const getRecentAstroblog = payload => ({
    type: actionTypes.GET_RECENT_ASTRO_BLOG, payload
});

export const setRecentAstroblog = payload => ({
    type: actionTypes.SET_RECENT_ASTRO_BLOG, payload
});

export const incrementAstroBlogViewCount = payload => ({
    type: actionTypes.INCREMENT_ASTRO_BLOG_VIEW_COUNT, payload
});