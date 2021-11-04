import { combineReducers } from "redux";
import auth from "./auth";
import dashboard from "./dashboard";
import expense from "./expense";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
    auth,
    dashboard,
    expense,
    errors,
    messages
});