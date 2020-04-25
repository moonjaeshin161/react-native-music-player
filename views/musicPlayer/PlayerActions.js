export const types = {
    SET_CURRENT_SONG: 'SET_CURRENT_SONG'
}

export function setCurrentSong(currentSong) {
    return {
        type: types.SET_CURRENT_SONG,
        payload: currentSong
    }
}