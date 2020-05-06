import { types } from "./UserActions";

const initialState = {
    user: {}
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER: return { ...state, user: action.payload }
        default: return state;
    }
}