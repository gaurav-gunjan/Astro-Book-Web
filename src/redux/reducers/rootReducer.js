import { combineReducers } from "redux";
import commonReducer from "./commonReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import profileReducer from "./profileReducer";
import astrologerReducer from "./astrologerReducer";
import chatReducer from "./chatReducer";
import kundliReducer from "./kundliReducer";
import astrologyApiReducer from "./astrologyApiReducer";
import ecommerceReducer from "./ecommerceReducer";
import blogreducer from "./blogs";
import staticPageReducer from "./staticPageReducer";

const rootReducer = combineReducers({
    commonReducer,
    authReducer,
    userReducer,
    profileReducer,
    astrologerReducer,
    chatReducer,
    kundliReducer,
    astrologyApiReducer,
    ecommerceReducer,
    blogreducer,
    staticPageReducer,
});

export default rootReducer;
