import { combineReducers } from 'redux';

import { registration } from './registerReducer';
import { authentication } from './authenticationReducer';

const rootReducer = combineReducers({
    registration,
    authentication,
});

export default rootReducer;