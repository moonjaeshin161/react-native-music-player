import { combineReducers } from 'redux';
import { PlayerReducer } from '../views/musicPlayer/PlayerReducer';
import { AuthReducer } from '../views/auth/AuthReducer';

const rootReducer = combineReducers({
    player: PlayerReducer,
    auth: AuthReducer
});

export default rootReducer;