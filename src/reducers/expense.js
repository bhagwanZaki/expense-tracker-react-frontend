import { GET_EXPENSE,CREATE_EXPENSE,DELETE_EXPENSE,UPDATE_EXPENSE } from "../actions/types";

const initialState = {
    isloaded:false,
    expense : []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action){
    switch (action.type) {
        case GET_EXPENSE:
            return {
                ...state,
                isloaded:true,
                expense: action.payload
            }            
        
        case CREATE_EXPENSE:
            return{
                ...state,
                expense: [...state.expense,action.payload]
            }
        case DELETE_EXPENSE:
            return{
                ...state,
                expense: state.expense.filter(item => item.id !== action.payload)
            }
        case UPDATE_EXPENSE:
            return{
                ...state,
                expense : state.expense.map(
                    (item) => item.id === action.payload.id ? action.payload : item
                )
            }
        default:
            return state
    }
}
