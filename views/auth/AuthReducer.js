import { types } from "./AuthAction";

const initialState = {
    isLogin: false,
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS: return { ...state, isLogin: true };
        case types.LOGIN_FAIL: return { ...state, isLogin: false };
        case types.REGISTER_SUCCESS: return { ...state, isLogin: true };
        case types.REGISTER_FAIL: return { ...state, isLogin: false };
        case types.SIGN_OUT_FAIL: return { ...state, isLogin: true }
        case types.SIGN_OUT_SUCCESS: return { ...state, isLogin: false }
        default: return state;
    }
}