import * as actionTypes from '../action-types'

const initialState = {
    productCategoryData: [],
    productsData: [],
    cartData: {},
    pujaData: [],
    //* This is for astrologer side UI
    pujaCreatedData: []
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

        //* This is for astrologer side UI
        case actionTypes.SET_PUJA_CREATED:
            return { ...state, pujaCreatedData: payload };

        default:
            return state;
    }
}

export default ecommerceReducer;