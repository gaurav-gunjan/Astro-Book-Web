import * as actionTypes from '../action-types'

const initialState = {
    astroblogCategoryData: [],
    astroBlogData: [],
    recentAstroBlogData: []
};

const blogreducer = (state = initialState, actions) => {
    const { type, payload } = actions;

    switch (type) {
        case actionTypes.SET_ASTRO_BLOG_CATEGORY:
            return { ...state, astroblogCategoryData: payload };

        case actionTypes.SET_ASTRO_BLOG:
            return { ...state, astroBlogData: payload };

        case actionTypes.SET_RECENT_ASTRO_BLOG:
            return { ...state, recentAstroBlogData: payload };

        default:
            return state;
    }
}

export default blogreducer;