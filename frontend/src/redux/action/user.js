import { REGISTER, LOGIN, LOGOUT } from '../type';
import axios from 'axios';

export const registerUser = (user) => async dispatch => {
    try {
        const { data } = await axios({
            method: "post",
            url: '/users',
            data: user
        });
        dispatch({
            type: REGISTER,
            payload: {
                error: null,
                data: data
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: REGISTER,
            payload: {
                error: error.response.data.error,
                data: null
            }
        })
    }
};

export const userLogin = (user) => async dispatch => {
    try {
        const { data } = await axios({
            method: "post",
            url: `/users/login`,
            data: {
                email: user.email,
                password: user.password
            }
        });
        dispatch({
            type: LOGIN,
            payload: { error: null, user: data, isAuthenticated: true }
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: LOGIN,
            payload: {
                error: error.response.data.error,
                info: null,
                isAuthenticated: false,
                user: null
            }
        })
    }
}

export const logout = () => async dispatch => {
    try {
        await axios({
            method: "delete",
            url: `/users/logout`
        });
        dispatch({
            type: LOGOUT,
            payload: null
        })
    } catch (error) {
        console.log(error)

    }
}