import { types } from './PlayerActions';

const initialState = {
    selected: {},
    list: [],
    currentSong: {

    },
}

export const PlayerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CURRENT_SONG: return { ...state, currentSong: action.payload };
        case types.SET_SONG_LIST: return { ...state, list: action.payload }
        default: return state;
    }
}