import * as actionTypes from "../action-types";

const initialState = {

};

const paymentReducer = (state = initialState, actions) => {
    const { payload, type } = actions;

    switch (type) {
        default: {
            return state;
        }
    }
};

export default paymentReducer;
