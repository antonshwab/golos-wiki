import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from '../reducers';


const loggerMiddleware = createLogger()

export const history = createHistory();

export const configureStore = () => {
  return createStore(
    connectRouter(history)(rootReducer),
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        routerMiddleware(history)
      )
    )
  )
}

