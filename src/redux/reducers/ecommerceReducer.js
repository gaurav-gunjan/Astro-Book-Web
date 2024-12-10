import * as actionTypes from '../action-types'

const initialState = {
    productCategoryData: [],
    productsData: [],
    cartData: {},
    //* This is for astrologer side UI
    createdPujaData: [],
    //* This is for customer side UI
    approvedCreatedPujaData: [],
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

        //* This is for astrologer side UI
        case actionTypes.SET_CREATED_PUJA:
            return { ...state, createdPujaData: payload };

        //* This is for customer side UI
        case actionTypes.SET_APPROVED_CREATED_PUJA:
            return { ...state, approvedCreatedPujaData: payload };

        default:
            return state;
    }
}

export default ecommerceReducer;