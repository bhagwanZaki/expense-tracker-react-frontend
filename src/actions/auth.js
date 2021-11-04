/* eslint-disable no-sequences */
import axios from 'axios';
import { AUTH_ERROR,USER_LOADED,USER_LOADING,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT_SUCCESS,REGISTER_SUCCESS,REGISTER_FAIL,BASE_URL, PROFILE_SUCCESS, PROFILE_FAIL, CREATE_PROFILE, UPDATE_PROFILE } from "./types";
import { returnErrors } from './messages';
// settting up config

const url = `${BASE_URL}api/auth/`

export const tokenConfig = getState => {
    const token = getState().auth.token;

    //header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // if token, add to headers config
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config
}


// LoadUser function that will be called whenever new website is loaded for user authentication purpose
export const loadUser = () => (dispatch,getState) => {
    dispatch({ type: USER_LOADING});

    axios.get(`${url}user`,tokenConfig(getState)).then(
        res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }
    ).catch(
        err => {
            dispatch(returnErrors(err.response.data,err.response.data));
            dispatch({
                type: AUTH_ERROR
            });
        }
    )
    

}

// Login function
export const login = (username,password) => (dispatch,getState) =>{
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request Body
    const body = JSON.stringify({
        username,
        password
    })
   
    axios.post(`${url}login`,body,config).then(
        res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }
    ).catch(
        err => {

            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
    })
}

//logout user
export const logout = () => (dispatch,getState) => {

    axios.post(`${url}logout`,null,tokenConfig(getState)).then(
        res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            })
        }
    ).catch(
        err => {
            dispatch(returnErrors(err.response.data,err.response.data));
            dispatch({
                type:AUTH_ERROR
            })
        }
    )
}

// register 
export const register = ({ username, password , email}) => dispatch =>{
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request Body

    const body = JSON.stringify({
        username,
        password,
        email
    })
   

    axios.post(`${url}register`,body,config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: REGISTER_FAIL
        });
    })
}


// Load profile
export const loadProfile = () => (dispatch,getState) => {
    axios.get(`${url}profile/`,tokenConfig(getState)).then(
        res => {
            if (res.data.length !== 0){
                dispatch({
                    type:PROFILE_SUCCESS,
                    payload:res.data
                })
            } else {
                dispatch({
                    type:PROFILE_FAIL
                })
            }
        }
    ).catch(
        err => {
            dispatch({
                type:PROFILE_FAIL
            })
        }
    )
}

// create profile
export const createProfile = Profile => (dispatch,getState) =>{
    axios.post(`${url}profile/`,Profile,tokenConfig(getState)).then(
        res => {
            dispatch({
                type: CREATE_PROFILE,
                payload: res.data
            })
        }
    ).catch(
        err =>{
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type:PROFILE_FAIL
            })
        }
    )
}

// update profile
export const updateProfile = Profile => (dispatch,getState) => {
    axios.patch(`${url}profile/`,Profile,tokenConfig(getState)).then(
        res => {
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data    
            })
        }
    ).catch(
        err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type:PROFILE_FAIL
            })
        }
    )
}