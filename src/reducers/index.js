import { LOAD_ARTICLES_REQUEST, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_FAILURE, GOTO_ARTICLE, INIT_CREATION_NEW_ARTICLE, ARTICLE_META_DATA_CHANGE, ARTICLE_CONTENT_CHANGE, LOAD_CURRENT_ARTICLE_VERSIONS_REQUEST, LOAD_CURRENT_ARTICLE_VERSIONS_SUCCESS, LOAD_CURRENT_ARTICLE_VERSIONS_FAILURE, GOTO_ARTICLE_VERSION, PICKUP_ARTICLE_VERSION } from '../actions';
import * as R from 'ramda';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { combineReducers } from 'redux';


const articles = (
  state = {
    isLoading: true,
  },
  action
) => {
  const { payload } = action;
  switch (action.type) {
    case LOAD_ARTICLES_REQUEST:
      return {
        ...state, 
        isLoading: true,
      };
    case LOAD_ARTICLES_SUCCESS:
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
    case LOAD_ARTICLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action,
      };
    default:
      return state;
  }
};

const articleCreation = (
  state = {
    title: '',
    category: '',
    tags: {},
    content: '',
  }, 
  action) => {

  switch (action.type) {
    case INIT_CREATION_NEW_ARTICLE:
      return state;
    case ARTICLE_META_DATA_CHANGE:
      const { fieldId, data  } = action.payload;
      return {
        ...state,
        [fieldId]: data
      };
    case ARTICLE_CONTENT_CHANGE:
      const content = action.payload;
      return {
        ...state,
        content
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
    // author: 'beesocial-test3',
    // privateKey: '5KMactRzn9QpoY9RdDDrjULfGxi5AK1KB7C8YxvsYRq7jS4BZQv',
    author: 'beesocial-test4',
    privateKey: '5JJpY93XKxkrfo1aFBU2sc3Xc7oVyiLyXqYRuG3DPWW7TZbMPVR'
  },
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

const currentArticle = (
  state = {
    isLoading: false,
  }, 
  action
) => {
  switch (action.type) {
    case LOAD_CURRENT_ARTICLE_VERSIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_CURRENT_ARTICLE_VERSIONS_SUCCESS:
      const { response } = action.payload;
      return {
        ...state,
        isLoading: false,
        versions: response
      };
    case LOAD_CURRENT_ARTICLE_VERSIONS_FAILURE:
      const { error } = action;
      return {
        ...state,
        isLoading: false,
        error
      };
    case '@@router/LOCATION_CHANGE':
      const { pathname } = action.payload;
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
  entities: articles,
  currentArticle,
  articleCreation,
  router: routerReducer
});


export default rootReducer;