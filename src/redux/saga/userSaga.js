import Swal from 'sweetalert2';
import { Color } from '../../assets/colors';
import * as actionTypes from "../action-types";
import { toaster } from '../../utils/services/toast-service';
import { call, put, select, takeLeading } from 'redux-saga/effects';
import { postAPI, razorpayPayment } from '../../utils/api-function';
import { change_user_astrologer_call_status, change_user_astrologer_chat_status, change_user_astrologer_video_call_status, create_user_customer_address, delete_user_customer_address, get_user_astrologer_booked_puja_history, get_user_astrologer_by_id, get_user_astrologer_registered_puja_history, get_user_astrologer_transaction_history, get_user_astrologer_wallet_history, get_user_customer_address, get_user_customer_by_id, get_user_customer_order_history, get_user_customer_puja_book_history, get_user_customer_transaction_history, get_user_customer_wallet_history, recharge_user_customer_wallet, update_user_customer_address, user_astrologer_withdrawal_request } from '../../utils/api-routes';

//! Customer
function* getUserCustomerById(action) {
    try {
        const { payload } = action;
        // console.log("Get User Customer By Id Payload ::: ", payload);

        const { data } = yield postAPI(get_user_customer_by_id, payload);
        // console.log("Get User Customer By Id Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_CUSTOMER_BY_ID, payload: data?.customersDetail });
        }

    } catch (error) {
        console.log("Get User Customer By Id Saga Error ::: ", error);
    }
};

function* getUserCustomerWalletHistory() {
    try {
        const userCustomer = yield select(state => state?.userReducer?.userCustomerDataById);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_user_customer_wallet_history, { customerId: userCustomer?._id });
        console.log("Get User Customer Wallet History Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_CUSTOMER_WALLET_HISTORY, payload: data?.walletHistory });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get User Customer Wallet History Saga Error ::: ", error?.response?.data);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* rechargeUserCustomerWallet(action) {
    try {
        const { payload } = action;
        console.log("Recharge User Customer Wallet Payload ::: ", payload);

        const razorpayResponse = yield razorpayPayment({ amount: payload?.data?.amount, name: payload?.user?.customerName, email: payload?.user?.email, contact: payload?.user?.phoneNumber })
        console.log("Razor Pay Response ::: ", razorpayResponse);

        if (razorpayResponse?.status) {
            const { data } = yield postAPI(recharge_user_customer_wallet, { ...payload?.data, paymentId: razorpayResponse?.result?.razorpay_payment_id, });
            console.log("Final Response :: ", data);

            if (data?.status) {
                toaster({ text: data?.message });
                yield put({ type: actionTypes.GET_USER_CUSTOMER_BY_ID, payload: { customerId: localStorage.getItem('current_user_id') } })
                yield call(payload?.onComplete);
            }
        } else toaster?.error({ text: 'Payment Failed.' });

    } catch (error) {
        toaster?.error({ text: 'Payment Failed.' });
        console.log("Handle Payment Saga Error ::: ", error);
    }
};

function* getUserCustomerTransactionHistory() {
    try {
        const userCustomer = yield select(state => state?.userReducer?.userCustomerDataById);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_user_customer_transaction_history, { customerId: userCustomer?._id });
        console.log("Get User Customer Transaction History Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_CUSTOMER_TRANSACTION_HISTORY, payload: data?.data });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get User Customer Transaction History Saga Error ::: ", error?.response?.data);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getUserCustomerOrderHistory() {
    try {
        const userCustomer = yield select(state => state?.userReducer?.userCustomerDataById);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_user_customer_order_history, { customerId: userCustomer?._id });
        console.log("Get User Customer Order History Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_CUSTOMER_ORDER_HISTORY, payload: data?.getProductOrder?.reverse() });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get User Customer Order History Saga Error ::: ", error?.response?.data);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getUserCustomerPujaBookHistory() {
    try {
        const userCustomer = yield select(state => state?.userReducer?.userCustomerDataById);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_user_customer_puja_book_history, { customerId: userCustomer?._id });
        console.log("Get User Customer Puja Book History Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_CUSTOMER_PUJA_BOOK_HISTORY, payload: data?.results });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get User Customer Puja Book History Saga Error ::: ", error?.response?.data);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getUserCustomerAddress() {
    try {
        const userCustomer = yield select(state => state?.userReducer?.userCustomerDataById);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_user_customer_address, { customerId: userCustomer?._id });
        console.log("Get User Customer Address Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_CUSTOMER_ADDRESS, payload: data?.data });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get User Customer Address Saga Error ::: ", error?.response?.data);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* createUserCustomerAddress(action) {
    try {
        const { payload } = action;
        console.log("Create User Customer Address Payload ::: ", payload);

        const { data } = yield postAPI(create_user_customer_address, payload?.data);
        console.log("Create User Customer Address Saga Response ::: ", data);

        if (data?.success) {
            toaster?.success({ text: 'Address created successfully.' });
            yield put({ type: actionTypes?.GET_USER_CUSTOMER_ADDRESS, payload: null });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        toaster?.error({ text: 'Failed to create user customer address.' });
        console.log("Create User Customer Address Saga Error ::: ", error?.response?.data);
    }
};

function* updateUserCustomerAddress(action) {
    try {
        const { payload } = action;
        console.log("Update User Customer Address Payload ::: ", payload);

        const { data } = yield postAPI(update_user_customer_address, payload?.data);
        console.log("Update User Customer Address Saga Response ::: ", data);

        if (data?.success) {
            toaster?.success({ text: 'Address updated successfully.' });
            yield put({ type: actionTypes?.GET_USER_CUSTOMER_ADDRESS, payload: null });
        }

    } catch (error) {
        toaster?.error({ text: 'Failed to update user customer address.' });
        console.log("Update User Customer Address Saga Error ::: ", error?.response?.data);
    }
};

function* deleteUserCustomerAddress(action) {
    try {
        const { payload } = action;
        console.log("Delete User Customer Address Payload ::: ", payload);

        const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield postAPI(delete_user_customer_address, payload);
            console.log("Delete User Customer Address Saga Response ::: ", data);

            if (data?.success) {
                toaster?.success({ text: 'Address deleted successfully.' });
                yield put({ type: actionTypes?.GET_USER_CUSTOMER_ADDRESS, payload: null });
            }
        }

    } catch (error) {
        toaster.error({ text: 'Failed to delete user customer address.' });
        console.log("Delete User Customer Address Saga Error ::: ", error?.response?.data);
    }
};

//! Astrologer
function* getUserAstrologerById(action) {
    try {
        const { payload } = action;
        // console.log("Get User Astrologer By Payload ::: ", payload);

        const { data } = yield postAPI(get_user_astrologer_by_id, payload);
        // console.log("Get User Astrologer By Id Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_ASTROLOGER_BY_ID, payload: data?.astrologer });
        }

    } catch (error) {
        console.log("Get User Astrologer By Id Saga Error ::: ", error);
    }
};

function* changeUserAstrologerChatStatus(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);
        const userAstrologer = yield select(state => state?.userReducer?.userAstrologerDataById)

        const result = yield Swal.fire({ title: `Are you sure ?`, text: `You want to change chat status!!!`, icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield postAPI(change_user_astrologer_chat_status, payload?.data);
            console.log("Change User Astrologer Chat Status Saga Response ::: ", data);

            if (data?.success) {
                if (data?.type == 'Not Verified') toaster?.info({ text: data?.message });
                else toaster?.success({ text: 'Chat status has been updated' });
                yield put({ type: actionTypes.GET_USER_ASTROLOGER_BY_ID, payload: { astrologerId: userAstrologer?._id } });
            }
        }

    } catch (error) {
        toaster?.error({ text: 'Failed to change chat status!' });
        console.log("Change User Astrologer Chat Status Saga Error ::: ", error?.response?.data);
    }
};

function* changeUserAstrologerCallStatus(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);
        const userAstrologer = yield select(state => state?.userReducer?.userAstrologerDataById)

        const result = yield Swal.fire({
            title: `Are you sure ?`, text: `You want to change call status!!!`,
            icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
        });

        if (result.isConfirmed) {
            const { data } = yield postAPI(change_user_astrologer_call_status, payload?.data);
            console.log("Change User Astrologer Call Status Saga Response ::: ", data);

            if (data?.success) {
                if (data?.type == 'Not Verified') toaster?.info({ text: data?.message });
                else toaster?.success({ text: 'Call status has been updated' });
                yield put({ type: actionTypes.GET_USER_ASTROLOGER_BY_ID, payload: { astrologerId: userAstrologer?._id } });
            }
        }

    } catch (error) {
        toaster?.error({ text: 'Failed to change call status!' });
        console.log("Change User Astrologer Call Status Saga Error ::: ", error?.response?.data);
    }
};

function* changeUserAstrologerVideoCallStatus(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);
        const userAstrologer = yield select(state => state?.userReducer?.userAstrologerDataById)

        const result = yield Swal.fire({
            title: `Are you sure ?`, text: `You want to change video call status!!!`,
            icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
        });

        if (result.isConfirmed) {
            const { data } = yield postAPI(change_user_astrologer_video_call_status, payload?.data);
            console.log("Change User Astrologer Video Call Status Saga Response ::: ", data);

            if (data?.success) {
                if (data?.type == 'Not Verified') toaster?.info({ text: data?.message });
                else toaster?.success({ text: 'Video call status has been updated' });
                yield put({ type: actionTypes.GET_USER_ASTROLOGER_BY_ID, payload: { astrologerId: userAstrologer?._id } });
            }
        }

    } catch (error) {
        toaster?.error({ text: 'Failed to change video call status!' });
        console.log("Change User Astrologer Video Call Status Saga Error ::: ", error?.response?.data);
    }
};

function* userAstrologerWithdrawalRequest(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(user_astrologer_withdrawal_request, payload?.data);
        console.log("User Astrologer Withdrawal Request Saga Response ::: ", data);

        if (data?.success) {
            toaster?.success({ text: 'Withdrawal request has been sent' });
        }
        yield call(payload?.onComplete);

    } catch (error) {
        toaster?.error({ text: 'Failed to send withdrawal request!' });
        console.log("User Astrologer Withdrawal Request Saga Error ::: ", error?.response?.data);
    }
};

function* getUserAstrologerWalletHistory() {
    try {
        const userAstrologer = yield select(state => state?.userReducer?.userAstrologerDataById);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_user_astrologer_wallet_history, { astrologerId: userAstrologer?._id });
        console.log("Get User Astrologer Wallet History Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_ASTROLOGER_WALLET_HISTORY, payload: data?.results?.reverse() });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get User Astrologer Wallet History Saga Error ::: ", error?.response?.data);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getUserAstrologerTransactionHistory(action) {
    try {
        const { payload } = action;
        const userAstrologer = yield select(state => state?.userReducer?.userAstrologerDataById);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_user_astrologer_transaction_history, { astrologerId: userAstrologer?._id, count: payload?.count });
        console.log("Get User Astrologer Transaction History Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_ASTROLOGER_TRANSACTION_HISTORY, payload: data?.data });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get User Astrologer Transaction History Saga Error ::: ", error?.response?.data);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getUserAstrologerRegisteredPujaHistory() {
    try {
        const userAstrologer = yield select(state => state?.userReducer?.userAstrologerDataById);

        // yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_user_astrologer_registered_puja_history, { astrologerId: userAstrologer?._id });
        console.log("Get User Astrologer Registered Puja History Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_ASTROLOGER_REGISTERED_PUJA_HISTORY, payload: data?.pooja });
        }
        // yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get User Astrologer Registered Puja History Saga Error ::: ", error?.response?.data);
        // yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

function* getUserAstrologerBookedPujaHistory() {
    try {
        const userAstrologer = yield select(state => state?.userReducer?.userAstrologerDataById);

        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield postAPI(get_user_astrologer_booked_puja_history, { astrologerId: userAstrologer?._id });
        console.log("Get User Astrologer Booked Puja History Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USER_ASTROLOGER_BOOKED_PUJA_HISTORY, payload: data?.pooja });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        console.log("Get User Astrologer Booked Puja History Saga Error ::: ", error?.response?.data);
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
};

export default function* userSaga() {
    yield takeLeading(actionTypes?.GET_USER_CUSTOMER_BY_ID, getUserCustomerById);
    yield takeLeading(actionTypes?.GET_USER_CUSTOMER_WALLET_HISTORY, getUserCustomerWalletHistory);
    yield takeLeading(actionTypes?.RECHARGE_USER_CUSTOMER_WALLET, rechargeUserCustomerWallet);
    yield takeLeading(actionTypes?.GET_USER_CUSTOMER_TRANSACTION_HISTORY, getUserCustomerTransactionHistory);
    yield takeLeading(actionTypes?.GET_USER_CUSTOMER_ORDER_HISTORY, getUserCustomerOrderHistory);
    yield takeLeading(actionTypes?.GET_USER_CUSTOMER_PUJA_BOOK_HISTORY, getUserCustomerPujaBookHistory);

    yield takeLeading(actionTypes?.GET_USER_CUSTOMER_ADDRESS, getUserCustomerAddress);
    yield takeLeading(actionTypes?.CREATE_USER_CUSTOMER_ADDRESS, createUserCustomerAddress);
    yield takeLeading(actionTypes?.UPDATE_USER_CUSTOMER_ADDRESS, updateUserCustomerAddress);
    yield takeLeading(actionTypes?.DELETE_USER_CUSTOMER_ADDRESS, deleteUserCustomerAddress);

    yield takeLeading(actionTypes?.GET_USER_ASTROLOGER_BY_ID, getUserAstrologerById);
    yield takeLeading(actionTypes?.CHANGE_USER_ASTROLOGER_CHAT_STATUS, changeUserAstrologerChatStatus);
    yield takeLeading(actionTypes?.CHANGE_USER_ASTROLOGER_CALL_STATUS, changeUserAstrologerCallStatus);
    yield takeLeading(actionTypes?.CHANGE_USER_ASTROLOGER_VIDEO_CALL_STATUS, changeUserAstrologerVideoCallStatus);
    yield takeLeading(actionTypes?.USER_ASTROLOGER_WITHDRAWAL_REQUEST, userAstrologerWithdrawalRequest);
    yield takeLeading(actionTypes?.GET_USER_ASTROLOGER_WALLET_HISTORY, getUserAstrologerWalletHistory);
    yield takeLeading(actionTypes?.GET_USER_ASTROLOGER_TRANSACTION_HISTORY, getUserAstrologerTransactionHistory);
    yield takeLeading(actionTypes?.GET_USER_ASTROLOGER_REGISTERED_PUJA_HISTORY, getUserAstrologerRegisteredPujaHistory);
    yield takeLeading(actionTypes?.GET_USER_ASTROLOGER_BOOKED_PUJA_HISTORY, getUserAstrologerBookedPujaHistory);
};