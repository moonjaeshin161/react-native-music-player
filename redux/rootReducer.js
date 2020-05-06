import { combineReducers } from 'redux';
import { PlayerReducer } from '../views/musicPlayer/PlayerReducer';
import { AuthReducer } from '../views/auth/AuthReducer';
import { UserReducer } from '../views/user/UserReducer';

const rootReducer = combineReducers({
    player: PlayerReducer,
    auth: AuthReducer,
    user: UserReducer
});

export default rootReducer;