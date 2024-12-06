import * as actionTypes from '../action-types'

const initialState = {
    productCategoryData: [],
    productsData: [],
    cartData: {},
    pujaData: [],
}

const ecommerceReducer = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_PRODUCT_CATEGORY:
            return { ...state, productCategoryData: payload };

        case actionTypes.SET_PRODUCTS:
            return { ...state, productsData: payload };

        case actionTypes.SET_CART_DATA:
            return { ...state, cartData: payload };

        case actionTypes.SET_PUJA:
            return { ...state, pujaData: payload };

        default:
            return state;
    }
}

export default ecommerceReducer;