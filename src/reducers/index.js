import * as R from 'ramda';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import * as types from '../actions/actionTypes';

const articles = (
  state = {
    isLoading: true,
  },
  action
) => {
  const { payload } = action;
  switch (action.type) {
    case types.LOAD_ARTICLES_REQUEST:
      return {
        ...state, 
        isLoading: true,
      };
    case types.LOAD_ARTICLES_SUCCESS:
      const origins = {
        allIds: payload.result,
        byId: payload.origins,
      };
      const versions = {
        allIds: R.values(payload.versions),        
        byId: payload.versions,
      };
      return {
        ...state,
        isLoading: false,
        origins,
        versions,
      };
    case types.LOAD_ARTICLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action,
      };
    default:
      return state;
  }
};

const auth = (
  state = {
    // author: 'beesocial-test',
    // privateKey: '5JQNLbQxdLECxT7pi8DyTFoE4tL8fyyWAJ3QLa8Tdb85NRjiic7',
    // author: 'beesocial-test2',
    // privateKey: '5K5jsJr3mFaMT8NQ7F95UGP5zmsP8mVt4ZuW9trnBMBRBiEe38L',
    author: 'beesocial-test3',
    privateKey: '5KMactRzn9QpoY9RdDDrjULfGxi5AK1KB7C8YxvsYRq7jS4BZQv',
    // author: 'beesocial-test4',
    // privateKey: '5JJpY93XKxkrfo1aFBU2sc3Xc7oVyiLyXqYRuG3DPWW7TZbMPVR'
  },
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

const currentArticle = (
  state = {}, 
  action
) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      const { pathname } = action.payload.location;
      const pathParts = pathname.split('/');
      const [ , articles, originPermlink, versionPermlink ] = pathParts;
      if ( articles === 'articles' && originPermlink && versionPermlink ) {
        return {
          ...state,
          originPermlink,
          versionPermlink
        };
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  auth,
  form: formReducer,
  entities: articles,
  currentArticle,
});

export default rootReducer;