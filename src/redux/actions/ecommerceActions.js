import * as actionTypes from '../action-types'

export const getProductCategory = payload => ({
    type: actionTypes.GET_PRODUCT_CATEGORY, payload
});

export const setProductCategory = payload => ({
    type: actionTypes.SET_PRODUCT_CATEGORY, payload
});

export const getProducts = payload => ({
    type: actionTypes.GET_PRODUCTS, payload
});

export const setProducts = payload => ({
    type: actionTypes.SET_PRODUCTS, payload
});

export const addToCart = payload => ({
    type: actionTypes.ADD_TO_CART, payload
});

export const getCartData = payload => ({
    type: actionTypes.GET_CART_DATA, payload
});

export const setCartData = payload => ({
    type: actionTypes.SET_CART_DATA, payload
});

export const updateCartQuantity = payload => ({
    type: actionTypes.UPDATE_CART_QUANTITY, payload
});

export const orderCart = payload => ({
    type: actionTypes.ORDER_CART, payload
});

//* This is for astrologer side UI
export const getCreatedPuja = payload => ({
    type: actionTypes.GET_CREATED_PUJA, payload
});

export const setCreatedPuja = payload => ({
    type: actionTypes.SET_CREATED_PUJA, payload
});

export const registerCreatedPuja = payload => ({
    type: actionTypes.REGISTER_CREATED_PUJA, payload
});

//* This is for customer side UI
export const getApprovedCreatedPuja = payload => ({
    type: actionTypes.GET_APPROVED_CREATED_PUJA, payload
});

export const setApprovedCreatedPuja = payload => ({
    type: actionTypes.SET_APPROVED_CREATED_PUJA, payload
});

export const bookApprovedCreatedPuja = payload => ({
    type: actionTypes.BOOK_APPROVED_CREATED_PUJA, payload
});