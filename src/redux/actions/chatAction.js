import * as actionTypes from "../action-types";

// TODO : Chat
export const getLinkedProfileForChat = payload => ({
    type: actionTypes.GET_LINKED_PROFILE_FOR_CHAT, payload,
});

export const setLinkedProfileForChat = payload => ({
    type: actionTypes.SET_LINKED_PROFILE_FOR_CHAT, payload,
});

// export const createProfileForChat = payload => ({
//     type: actionTypes.CREATE_PROFILE_FOR_CHAT,
//    payload,
// });

// export const initiateChatMessage = payload => ({
//     type: actionTypes.INITIATE_CHAT_MESSAGE,
//    payload,
// });

export const chatRequestSendByCustomer = payload => ({
    type: actionTypes.CHAT_REQUEST_SEND_BY_CUSTOMER, payload,
});

export const chatRequestAcceptRejectByAstrologer = payload => ({
    type: actionTypes.CHAT_REQUEST_ACCEPT_REJECT_BY_ASTROLOGER, payload,
});

export const chatRequestAcceptRejectByCustomer = payload => ({
    type: actionTypes.CHAT_REQUEST_ACCEPT_REJECT_BY_CUSTOMER, payload,
});

export const setChatTimerCountdown = payload => ({
    type: actionTypes.SET_CHAT_TIMER_COUNTDOWN, payload,
});

export const endChatMessage = payload => ({
    type: actionTypes.END_CHAT_MESSAGE, payload,
});

export const closeChatMessage = payload => ({
    type: actionTypes.CLOSE_CHAT_MESSAGE, payload,
});

//* Rest 
export const sendChatMessage = payload => ({
    type: actionTypes.SEND_CHAT_MESSAGE, payload,
});

export const getChatMessage = payload => ({
    type: actionTypes.GET_CHAT_MESSAGE, payload,
});

export const setChatMessage = payload => ({
    type: actionTypes.SET_CHAT_MESSAGE, payload,
});

//* Chat Invoice 
export const getChatInvoiceData = payload => ({
    type: actionTypes.GET_CHAT_INVOICE_DATA, payload,
});

export const setChatInvoiceData = payload => ({
    type: actionTypes.SET_CHAT_INVOICE_DATA, payload,
});

export const getChatInvoiceVisibility = payload => ({
    type: actionTypes.GET_CHAT_INVOICE_VISIBILITY, payload,
});

export const setChatInvoiceVisibility = payload => ({
    type: actionTypes.SET_CHAT_INVOICE_VISIBILITY, payload,
});

// TODO : Call
export const callIntakeDetailData = payload => ({
    type: actionTypes.CALL_INTAKE_DETAIL_DATA, payload,
});

//* Call Invoice 
export const getCallInvoiceData = payload => ({
    type: actionTypes.GET_CALL_INVOICE_DATA, payload,
});

export const setCallInvoiceData = payload => ({
    type: actionTypes.SET_CALL_INVOICE_DATA, payload,
});

export const getCallInvoiceVisibility = payload => ({
    type: actionTypes.GET_CALL_INVOICE_VISIBILITY, payload,
});

export const setCallInvoiceVisibility = payload => ({
    type: actionTypes.SET_CALL_INVOICE_VISIBILITY, payload,
});

//* Rating 
export const getAstrologerRatingVisibility = payload => ({
    type: actionTypes.GET_ASTROLOGER_RATING_VISIBILITY, payload,
});

export const setAstrologerRatingVisibility = payload => ({
    type: actionTypes.SET_ASTROLOGER_RATING_VISIBILITY, payload,
});

//? Chat Request
export const requestInitiatedByCustomer = payload => ({
    type: actionTypes?.REQUEST_INITIATED_BY_CUSTOMER, payload
});

export const rejectChatByAstrologer = payload => ({
    type: actionTypes?.REJECT_CHAT_BY_ASTROLOGER, payload
});