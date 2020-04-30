import { types } from './PlayerActions';
import { RESULTS } from 'react-native-permissions';

const initialState = {
    selected: {},
    currentSong: {},
    readPermission: false,
}

export const PlayerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CURRENT_SONG: return { ...state, currentSong: action.payload };
        case types.VERIFY_PERMISSION: {
            if (action.payload === RESULTS.GRANTED) return { ...state, readPermission: true };
            return state;
        }
        default: return state;
    }
}