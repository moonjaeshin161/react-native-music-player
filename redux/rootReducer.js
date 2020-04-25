import { combineReducers } from 'redux';
import { PlayerReducer } from '../views/musicPlayer/PlayerReducer';

const rootReducer = combineReducers({
    player: PlayerReducer
});

export default rootReducer;