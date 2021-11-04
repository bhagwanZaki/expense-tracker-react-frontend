import { GET_DASHBOARD } from "../actions/types";

const initialState = {
    total_amount: 0,
    incomeAmt:0,
    savingAmt:0,
    expenseAmt:0,
    
    dayList: [],
    income_graph_data: [],
    saving_graph_data: [],
    expense_graph_data: [],
    
    total_income_count:0,
    total_saving_count:0,
    total_expense_count:0
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action){
    switch (action.type) {
        case GET_DASHBOARD:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}