import axios from 'axios';
import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { put, call, takeLeading } from 'redux-saga/effects';
import { api_urls } from '../../utils/api-urls';
import SocketService from '../../utils/services/socket-service';
import { postAPI } from '../../utils/api-function';
import { create_profile_for_chat, get_linked_profile_for_chat, initiate_chat_message } from '../../utils/api-routes';
import { toaster } from '../../utils/services/toast-service';

// TODO : Chat
function* getLinkedProfileForChat(action) {
    try {
        const { payload } = action;
        console.log("Get Linked Profile For Chat Payload ::: ", payload);

        const { data } = yield postAPI(get_linked_profile_for_chat, payload);
        console.log("Get Linked Profile For Chat Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_LINKED_PROFILE_FOR_CHAT, payload: data?.data });
        }

    } catch (error) {
        console.log("Get Linked Profile For Chat Saga Error ::: ", error);
    }
}

//! Chat 
function* chatRequestSendByCustomer(action) {
    try {
        const { payload } = action;
        console.log("chatRequestSendByCustomer Payload ::: ", payload);

        console.log('isNewProfile', payload?.isNewProfile);
        let profileId = payload?.selectedProfileId;

        if (payload?.isNewProfile) {
            const register_response = yield axios.post(api_urls + create_profile_for_chat, { ...payload?.profileData, customerId: localStorage.getItem('current_user_id') })

            console.log('register_response', register_response?.data)
            if (register_response?.data?.success) {
                profileId = register_response?.data?.data;
                console.log('register_response?.data?.data', register_response?.data?.data)
            }
        }
        console.log('profileId', profileId);

        if (payload?.type == 'chat') {
            const send_request = yield axios.post(api_urls + initiate_chat_message, { astrologerId: payload?.astrologerId, customerId: localStorage.getItem('current_user_id'), formId: profileId, chatPrice: payload?.chatPrice, })
            console.log('send_request', send_request?.data)

            if (send_request?.data?.success) {
                toaster.success({ text: "Chat request send successfully!!!" });
                SocketService.emit('createChatRoom', {
                    roomID: send_request?.data?.newChat?._id,
                    chatPrice: send_request?.data?.newChat?.chatPrice,
                    customerID: send_request?.data?.newChat?.customerId,
                    astroID: send_request?.data?.newChat?.astrologerId,
                    duration: send_request?.data?.duration,
                    newUser: false,
                    profileId: profileId
                });
                localStorage.setItem('Chat_price_during_chat', send_request?.data?.newChat?.chatPrice);
                SocketService.emit('joinChatRoom', send_request?.data?.newChat?._id);
                yield call(payload?.onComplete)

                yield put({ type: actionTypes.REQUEST_INITIATED_BY_CUSTOMER, payload: { initiated: true, timer: 60 } });

            } else {
                toaster.error({ text: send_request?.data?.message });
            }
        } else {
            const send_call_request = yield axios.post(api_urls + 'api/customers/initiate_call_with_exotel', { astrologerId: payload?.astrologerId, customerId: localStorage.getItem('current_user_id'), formId: profileId })
            console.log('send_call_request', send_call_request?.data);

            if (send_call_request?.data?.success) {
                toaster.success({ text: "Call request send successfully!!!" });
                yield call(payload?.onComplete)
            }
        }

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        toaster.error({ text: 'Failed to send request' })
        console.log("Get Chat Request Send By Customer Saga Error ::: ", error);
    }
}

function* chatRequestAcceptRejectByAstrologer(action) {
    try {
        const { payload } = action;
        console.log("chatRequestAcceptRejectByAstrologer Payload ::: ", payload);

        if (payload?.data?.status == 'Accept') {
            console.log("Accept")
            localStorage.setItem('chatId', payload?.data?.requestedData?.chatId);
            SocketService.emit('onAstroAccept', payload?.data?.requestedData?.chatId)
            SocketService.emit('joinChatRoom', payload?.data?.requestedData?.chatId)
            yield call(payload?.onComplete);
            yield put({ type: actionTypes.HIDE_CHAT_MESSAGE_INPUT_FIELD, payload: false });
            yield put({ type: actionTypes.REJECT_CHAT_BY_ASTROLOGER, payload: { rejected: false, timer: 60 } });
            SocketService.emit('startChatTimer', payload?.data?.requestedData?.chatId) //? Started Chat Timer On Astrologer Chat Accept
            return
        }

        else {
            const data = {
                roomID: payload?.data?.requestedData?.chatId,
                actionBy: 'astro'
            }
            yield call(payload?.onReject)
            SocketService.emit('declinedChat', data)
        }
    } catch (error) {
        console.log("chatRequestAcceptRejectByAstrologer Saga Error ::: ", error);
    }
}

// function* chatRequestAcceptRejectByCustomer(action) {
//     try {
//         const { payload } = action;
//         console.log("chatRequestAcceptRejectByCustomer Payload ::: ", payload);

//         if (payload?.data?.status == 'Accept') {
//             console.log("Accept")
//             SocketService.emit('startChatTimer', payload?.data?.requestedData?.chatId)
//             localStorage.setItem('chat_requested_data', JSON.stringify(payload?.data?.requestedData))
//             yield call(payload?.onComplete);
//             return
//         }

//         else {
//             const data = {
//                 roomID: payload?.data?.requestedData?.chatId,
//                 actionBy: 'customer'
//             }
//             yield call(payload?.onReject)
//             SocketService.emit('declinedChat', data)
//         }
//     } catch (error) {
//         console.log("chatRequestAcceptRejectByCustomer Saga Error ::: ", error);
//     }
// }

function* endChatMessage(action) {
    try {
        const { payload } = action;
        console.log('End Chat Message Payload ::: ', payload);

        SocketService.emit('endChat', { roomID: payload?.chatId });
        console.log("End Chat Saga Run");
        yield put({ type: actionTypes.CLOSE_CHAT_MESSAGE, payload: null });

    } catch (error) {
        console.log("endChatMessage Saga Error ::: ", error);
    }
}

function* closeChatMessage(action) {
    try {
        const { payload } = action;
        console.log("closeChatMessage Payload ::: ", payload);
        if (payload) {

            console.log('closeChatMessage Saga Run');
            const user_type = localStorage.getItem('user_type');
            console.log("User Type ::: ", user_type);

            // yield call(payload?.onComplete);
            console.log("On Complete Run");
            yield put({ type: actionTypes.HIDE_CHAT_MESSAGE_INPUT_FIELD, payload: true });

            // if (user_type == 'customer') {
            //     const close_chat_reponse = yield axios.post(api_urls + 'api/customers/get_chat_details', { chatId: localStorage.getItem('chatId') });
            //     console.log('close_chat_reponse', close_chat_reponse);
            //     if (close_chat_reponse?.data?.success) {
            //         yield put({ type: actionTypes.SET_CHAT_TIMER_COUNTDOWN, payload: 0 });
            //         yield put({ type: actionTypes.SET_CHAT_INVOICE_DATA, payload: close_chat_reponse?.data?.chatHistory });
            //         yield put({ type: actionTypes.SET_CHAT_INVOICE_VISIBILITY, payload: true });
            //         yield put({ type: actionTypes.GET_USER_CUSTOMER_BY_ID, payload: { customerId: localStorage.getItem('current_user_id') } });
            //     }
            // }

            const close_chat_reponse = yield axios.post(api_urls + 'api/customers/get_chat_details', { chatId: localStorage.getItem('chatId') });
            console.log('close_chat_reponse', close_chat_reponse);

            if (close_chat_reponse?.data?.success) {
                yield put({ type: actionTypes.SET_CHAT_TIMER_COUNTDOWN, payload: 0 });
                yield put({ type: actionTypes.SET_CHAT_INVOICE_DATA, payload: close_chat_reponse?.data?.chatHistory });

                if (user_type == 'customer') {
                    yield put({ type: actionTypes.SET_CHAT_INVOICE_VISIBILITY, payload: true });
                    yield put({ type: actionTypes.GET_USER_CUSTOMER_BY_ID, payload: { customerId: localStorage.getItem('current_user_id') } });
                }
                if (user_type == 'astrologer') {
                    yield put({ type: actionTypes.SET_ASTROLOGER_CHAT_INVOICE_VISIBILITY, payload: true });
                }
            }
        }
    } catch (error) {
        console.log("closeChatMessage Saga Error ::: ", error);
    }
}

export default function* chatSaga() {
    // TODO : Chat
    yield takeLeading(actionTypes?.GET_LINKED_PROFILE_FOR_CHAT, getLinkedProfileForChat);

    //! Chat 
    yield takeLeading(actionTypes?.CHAT_REQUEST_SEND_BY_CUSTOMER, chatRequestSendByCustomer);
    yield takeLeading(actionTypes?.CHAT_REQUEST_ACCEPT_REJECT_BY_ASTROLOGER, chatRequestAcceptRejectByAstrologer);
    // yield takeLeading(actionTypes?.CHAT_REQUEST_ACCEPT_REJECT_BY_CUSTOMER, chatRequestAcceptRejectByCustomer);
    yield takeLeading(actionTypes?.END_CHAT_MESSAGE, endChatMessage);
    yield takeLeading(actionTypes?.CLOSE_CHAT_MESSAGE, closeChatMessage);
}