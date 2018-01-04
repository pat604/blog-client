import {createStore, applyMiddleware, combineReducers} from 'redux';
import { authMiddleware, authReducer as auth } from 'redux-implicit-oauth2';

export default function configureStore(initialState) {
  return createStore(
    combineReducers({
      // other reducers
      auth
    }),
    initialState,
    applyMiddleware(authMiddleware)
  );
}
