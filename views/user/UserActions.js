export const types = {
    SET_USER: 'SET_USER',
    UPDATE_USER: 'UPDATE_USER',
}

export function setUser(user) {
    return {
        type: types.SET_USER,
        payload: user
    }
}

export function updateUser(newInfo) {
    return {
        type: types.UPDATE_USER,
        payload: newInfo
    }
}