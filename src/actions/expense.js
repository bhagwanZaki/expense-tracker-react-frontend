import { GET_EXPENSE,CREATE_EXPENSE,DELETE_EXPENSE,UPDATE_EXPENSE,BASE_URL } from "../actions/types";
import axios from "axios";
import { tokenConfig } from "./auth";
import { returnErrors, createMeassage } from "./messages";

const url = `${BASE_URL}api/expense/`

export const getexpense = () => (dispatch,getState) => {
    axios.get(url,tokenConfig(getState)).then(
        res => {
            dispatch({
                type: GET_EXPENSE,
                payload: res.data
            })
        }
    ).catch(
        err => {
            returnErrors(err.response.data, err.response.status)
        }
    )
}

export const createExpense = Expense => (dispatch,getState) => {
    axios.post(url,Expense,tokenConfig(getState)).then(
        res => {
            dispatch(createMeassage({ addLead: "New Transaction Added"}));
            dispatch({
                type: CREATE_EXPENSE,
                payload: res.data
            })
        }
    ).catch(
        err => {
            returnErrors(err.response.data, err.response.status);
        }
    )
}

export const updateExpense = Expense => (dispatch,getState) => {
    axios.patch(url,Expense,tokenConfig(getState)).then(
        res => {
            dispatch({
                type:UPDATE_EXPENSE,
                payload: res.data
            })
        }
    ).catch(
        err => {
            returnErrors(err.response.data, err.response.status);
        }
    )
}

export const deleteExpense = (id) => (dispatch,getState) => {
    axios.delete(url+`${id}`,tokenConfig(getState)).then(
        res => {
            dispatch(createMeassage({ deleteLead: "Todo Deleted"}));
            dispatch({
                type: DELETE_EXPENSE,
                payload: id
            })
        }
    ).catch(
        err => {
            returnErrors(err.response.data, err.response.status);
        }
    )
}