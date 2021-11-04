import { CREATE_MESSAGES, GET_ERRORS } from "./types";

// Create message

export const createMeassage = msg =>{
    return {
        type: CREATE_MESSAGES,
        payload: msg
    };
};

// action to return  errior

export const returnErrors = (msg, status) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status}
    };
}