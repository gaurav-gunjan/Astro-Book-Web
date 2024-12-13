import * as actionTypes from "../action-types";

const initialState = {
    linkedProfileData: [],
    //* Chat 
    chatTimerCountDown: 0,
    chatInvoiceData: {},
    chatInvoiceVisibility: false,
    astrologerChatInvoiceVisibility: false,
    hideChatMessageInputField: false,
    //* Call 
    callIntakeDetailData: { visible: false, profileId: null },
    callInvoiceData: {},
    callInvoiceVisibility: false,
    //* Rating 
    astrologerRatingVisibility: { data: null, ratingVisible: false },
    //? Chat Request
    requestInitiatedByCustomer: { initiated: false, timer: 60 },
    rejectChatByAstrologer: { rejected: false, timer: 60 }
};

const chatReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.SET_LINKED_PROFILE_FOR_CHAT:
            return { ...state, linkedProfileData: payload }

        //! Chat 
        case actionTypes.SET_CHAT_TIMER_COUNTDOWN:
            return { ...state, chatTimerCountDown: payload }
        case actionTypes.SET_CHAT_INVOICE_DATA:
            return { ...state, chatInvoiceData: payload }
        case actionTypes.SET_CHAT_INVOICE_VISIBILITY:
            return { ...state, chatInvoiceVisibility: payload }
        case actionTypes.SET_ASTROLOGER_CHAT_INVOICE_VISIBILITY:
            return { ...state, astrologerChatInvoiceVisibility: payload }
        case actionTypes.HIDE_CHAT_MESSAGE_INPUT_FIELD:
            return { ...state, hideChatMessageInputField: payload }

        //! Call
        case actionTypes.CALL_INTAKE_DETAIL_DATA:
            return { ...state, callIntakeDetailData: payload }
        case actionTypes.SET_CALL_INVOICE_DATA:
            return { ...state, callInvoiceData: payload }
        case actionTypes.SET_CALL_INVOICE_VISIBILITY:
            return { ...state, callInvoiceVisibility: payload }

        case actionTypes.SET_ASTROLOGER_RATING_VISIBILITY:
            return { ...state, astrologerRatingVisibility: payload }

        //! Chat Request
        case actionTypes.REQUEST_INITIATED_BY_CUSTOMER:
            return { ...state, requestInitiatedByCustomer: payload }

        case actionTypes.REJECT_CHAT_BY_ASTROLOGER:
            return { ...state, rejectChatByAstrologer: payload }

        default:
            return state;
    }
};

export default chatReducer;