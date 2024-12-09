import { call, delay, put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../action-types'
import { getAPI, postAPI, razorpayPayment } from '../../utils/api-function'
import { add_to_cart, book_puja, get_customer_cart, get_product_category, get_products, get_puja, get_puja_created, order_product, register_puja, update_cart_item_quantity } from '../../utils/api-routes'
import { api_urls } from '../../utils/api-urls';
import Swal from 'sweetalert2';
import { toaster } from '../../utils/services/toast-service';

function* getProductCategory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { data } = yield getAPI(get_product_category)
        console.log("Get Product Category Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_PRODUCT_CATEGORY, payload: data?.productCategory });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Product Category Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
}

function* getProductsData(action) {
    try {
        const { payload } = action;
        console.log("Get Products Data Saga Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_products, payload);
        console.log("Get Products Data Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_PRODUCTS, payload: data?.products })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        console.log("Get Product Data Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* addToCart(action) {
    try {
        const { payload } = action;
        console.log("Add To Cart Saga Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(add_to_cart, payload?.data);
        console.log("Add To Cart Saga Response ::: ", data);

        if (data?.success) {
            // Swal.fire({ icon: "success", text: data?.message, showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        console.log("Add To Cart Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getCartData(action) {
    try {
        const { payload } = action;
        console.log("Get Cart Saga Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const { data } = yield postAPI(get_customer_cart, { customerId: localStorage.getItem('current_user_id') });
        console.log("Get Cart Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_CART_DATA, payload: { cart: data?.cart, totalPrice: data?.totalPrice } })
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        console.log("Get Cart Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* updateCartQuantity(action) {
    try {
        const { payload } = action;
        console.log("Update Cart Quantity Saga Payload ::: ", payload);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(update_cart_item_quantity, payload);
        console.log("Update Cart Quantity Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.GET_CART_DATA, payload: null })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (error) {
        console.log("Update Cart Quantity Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* orderCart(action) {
    try {
        const { payload } = action;
        console.log("Order Cart Payload ::: ", payload);

        const razorpayResponse = yield razorpayPayment({ amount: payload?.amount, name: payload?.user?.customerName, email: payload?.user?.email, contact: payload?.user?.phoneNumber })

        console.log("Razor Pay Response ::: ", razorpayResponse);

        if (razorpayResponse?.status) {
            const { data } = yield postAPI('api/ecommerce/order_product', payload?.data);
            console.log("Final Response :: ", data);

            if (data?.success) {
                toaster({ text: data?.message });
                yield put({ type: actionTypes.GET_PRODUCT_CATEGORY, payload: null })
                yield call(payload?.onComplete);
            }
        } else toaster?.error({ text: 'Payment Failed.' });

    } catch (error) {
        toaster?.error({ text: 'Payment Failed.' });
        console.log("Order Cart Saga Error ::: ", error);
    }
}

function* getPuja() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        yield delay(100);
        const { data } = yield getAPI(get_puja);
        console.log("Get Puja Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_PUJA, payload: data?.pooja });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Puja Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* bookPuja(action) {
    try {
        const { payload } = action;
        console.log("Book Puja Payload ::: ", payload);

        const razorpayResponse = yield razorpayPayment({ amount: payload?.amount, name: payload?.user?.customerName, email: payload?.user?.email, contact: payload?.user?.phoneNumber })

        console.log("Razor Pay Response ::: ", razorpayResponse);

        if (razorpayResponse?.status) {
            const { data } = yield postAPI(book_puja, payload?.data);
            console.log("Final Response :: ", data);

            if (data?.success) {
                toaster({ text: data?.message });
                yield put({ type: actionTypes.GET_PUJA, payload: null })
                yield call(payload?.onComplete);
            }
        } else toaster?.error({ text: 'Payment Failed.' });

    } catch (error) {
        toaster?.error({ text: 'Payment Failed.' });
        console.log("Order Cart Saga Error ::: ", error);
    }
};

//* This is for astrologer side UI
function* getPujaCreated() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        yield delay(100);
        const { data } = yield getAPI(get_puja_created);
        console.log("Get Puja Created Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_PUJA_CREATED, payload: data?.pooja });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get Puja Created Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* registerPuja(action) {
    try {
        const { payload } = action;
        console.log("Register Puja Payload ::: ", payload);

        const { data } = yield postAPI(register_puja, payload?.data);
        console.log("Register Puja Saga Response ::: ", data);

        if (data?.success) {
            toaster({ text: data?.message });
            yield call(payload?.onComplete);
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (error) {
        console.log("Register Puja Saga Error ::: ", error);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* ecommerceSaga() {
    yield takeLeading(actionTypes.GET_PRODUCT_CATEGORY, getProductCategory);
    yield takeLeading(actionTypes.GET_PRODUCTS, getProductsData);
    yield takeLeading(actionTypes.ADD_TO_CART, addToCart);
    yield takeLeading(actionTypes.GET_CART_DATA, getCartData);
    yield takeLeading(actionTypes.UPDATE_CART_QUANTITY, updateCartQuantity);
    yield takeLeading(actionTypes.ORDER_CART, orderCart);

    yield takeLeading(actionTypes.GET_PUJA, getPuja);
    yield takeLeading(actionTypes.BOOK_PUJA, bookPuja);

    //* This is for astrologer side UI
    yield takeLeading(actionTypes.GET_PUJA_CREATED, getPujaCreated);
    yield takeLeading(actionTypes.REGISTER_PUJA, registerPuja);
};