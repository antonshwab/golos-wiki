import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';


const loggerMiddleware = createLogger()

export const history = createHistory();

export const configureStore = () => {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      routerMiddleware(history)
    )
  )
}

