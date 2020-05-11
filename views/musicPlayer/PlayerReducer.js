import { types } from './PlayerActions';
import { RESULTS } from 'react-native-permissions';

const initialState = {
    selected: {},
    currentSong: {},
    readPermission: false,
    writePermission: false,
}

export const PlayerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CURRENT_SONG: return { ...state, currentSong: action.payload };
        case types.VERIFY_READ_PERMISSION: {
            if (action.payload === RESULTS.GRANTED) return { ...state, readPermission: action.payload };
            return state;
        }
        case types.VERIFY_WRITE_PERMISSION: {
            if (action.payload === RESULTS.GRANTED) return { ...state, writePermission: action.payload };
            return state;
        }
        default: return state;
    }
}