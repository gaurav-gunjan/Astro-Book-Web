import * as actionTypes from "../action-types";

const initialState = {
    customerLoginInputFieldDetail: { phone_number: '', country_code_length: '' }
};

const authReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        case actionTypes.CUSTOMER_LOGIN_INPUT_FIELD:
            return { ...state, customerLoginInputFieldDetail: payload };

        default:
            return state;
    }
};

export default authReducer;