import * as actionTypes from "../action-types";

const initialState = {
    //! Customer 
    userCustomerDataById: null,
    userCustomerWalletHistoryData: [],
    userCustomerTransactionHistoryData: [],
    userCustomerOrderHistoryData: [],
    userCustomerPujaBookHistoryData: [],
    userCustomerAddressData: [],
    //! Astrologer 
    userAstrologerDataById: null,
    userAstrologerWalletHistoryData: [],
    userAstrologerTransactionHistoryData: [],
    userAstrologerTransactionHistoryData: [],
    userAstrologerRegisteredPujaHistoryData: [],
    userAstrologerBookedPujaHistoryData: []
};

const userReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        //! Customer 
        case actionTypes.SET_USER_CUSTOMER_BY_ID:
            return { ...state, userCustomerDataById: payload };

        case actionTypes.SET_USER_CUSTOMER_WALLET_HISTORY:
            return { ...state, userCustomerWalletHistoryData: payload };

        case actionTypes.SET_USER_CUSTOMER_TRANSACTION_HISTORY:
            return { ...state, userCustomerTransactionHistoryData: payload };

        case actionTypes.SET_USER_CUSTOMER_ORDER_HISTORY:
            return { ...state, userCustomerOrderHistoryData: payload };

        case actionTypes.SET_USER_CUSTOMER_PUJA_BOOK_HISTORY:
            return { ...state, userCustomerPujaBookHistoryData: payload };

        case actionTypes.SET_USER_CUSTOMER_ADDRESS:
            return { ...state, userCustomerAddressData: payload };

        //! Astrologer 
        case actionTypes.SET_USER_ASTROLOGER_BY_ID:
            return { ...state, userAstrologerDataById: payload };

        case actionTypes.SET_USER_ASTROLOGER_WALLET_HISTORY:
            return { ...state, userAstrologerWalletHistoryData: payload };

        case actionTypes.SET_USER_ASTROLOGER_TRANSACTION_HISTORY:
            return { ...state, userAstrologerTransactionHistoryData: payload };

        case actionTypes.SET_USER_ASTROLOGER_REGISTERED_PUJA_HISTORY:
            return { ...state, userAstrologerRegisteredPujaHistoryData: payload };

        case actionTypes.SET_USER_ASTROLOGER_BOOKED_PUJA_HISTORY:
            return { ...state, userAstrologerBookedPujaHistoryData: payload };

        default:
            return state;
    }
};

export default userReducer;