export const types = {
    SET_CURRENT_SONG: 'SET_CURRENT_SONG',
    VERIFY_READ_PERMISSION: 'VERIFY_READ_PERMISSION',
    VERIFY_WRITE_PERMISSION: 'VERIFY_WRITE_PERMISSION',
}

export function setCurrentSong(currentSong) {
    return {
        type: types.SET_CURRENT_SONG,
        payload: currentSong
    }
}

export function verifyReadPermission(result) {
    return {
        type: types.VERIFY_READ_PERMISSION,
        payload: result
    }
}

export function verifyWritePermission(result) {
    return {
        type: types.VERIFY_WRITE_PERMISSION,
        payload: result
    }
}
