import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes'

export function auth(login, password, isLogin) {
    return async dispatch => {

        

        if(isLogin) {
            localStorage.setItem('token', `${login} - ${Math.random()}`)
            dispatch(authSuccess(`${login} - ${Math.random()}`))
        } else {
            dispatch(logout())
        }
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')

        if(!token) {
            dispatch(logout())
        } else {
            dispatch(authSuccess(token))
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function logout() {
    localStorage.removeItem('token')    
    return {
        type: AUTH_LOGOUT
    }
}