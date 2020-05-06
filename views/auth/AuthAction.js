export const types = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAIL: 'REGISTER_FAIL',
    SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAIL: 'SIGN_OUT_FAIL',
}

export function loginSuccess() {
    return {
        type: types.LOGIN_SUCCESS,
    }
}

export function loginFail() {
    return {
        type: types.LOGIN_FAIL,
    }
}

export function registerSuccess() {
    return {
        type: types.REGISTER_SUCCESS,
    }
}

export function registerFail() {
    return {
        type: types.REGISTER_FAIL,
    }
}

export function signOutSuccess() {
    return {
        type: types.SIGN_OUT_SUCCESS
    }
}

export function signOutFail() {
    return {
        type: types.SIGN_OUT_FAIL
    }
}

