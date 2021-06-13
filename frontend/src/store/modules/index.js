import { combineReducers } from 'redux';

import auth from './auth/reducer';
import search from './search/reducer';
import users from './users/reducer';
import ThemeOptions from './ThemeOptions/reducer';

export default () => combineReducers({
    ThemeOptions,
    auth,
    search,
    users,
})
  