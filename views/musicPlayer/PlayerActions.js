export const types = {
    SET_CURRENT_SONG: 'SET_CURRENT_SONG',
    SET_SONG_LIST: 'SET_SONG_LIST',
    VERIFY_PERMISSION: 'VERIFY_PERMISSION',
}

export function setCurrentSong(currentSong) {
    return {
        type: types.SET_CURRENT_SONG,
        payload: currentSong
    }
}

export function setSongList(list) {
    return {
        type: types.SET_SONG_LIST,
        payload: list
    }
}

export function verifyPermission(result) {
    return {
        type: types.VERIFY_PERMISSION,
        payload: result
    }
}
