export const types = {
    SET_USER: 'SET_USER',
}

export function setUser(user) {
    return {
        type: types.SET_USER,
        payload: user
    }
}