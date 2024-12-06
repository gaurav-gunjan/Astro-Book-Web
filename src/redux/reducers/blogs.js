import * as actionTypes from '../action-types'

const initialState = {
    astroBlogData: null
};

const blogreducer = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_ASTRO_BLOGS:
            return {
                ...state,
                astroBlogData: payload,
            };
    }
    return state;
}

export default blogreducer