import { LOAD_ARTICLES_REQUEST, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_FAILURE, GOTO_ARTICLE, INIT_CREATION_NEW_ARTICLE, ARTICLE_META_DATA_CHANGE, ARTICLE_CONTENT_CHANGE } from '../actions';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { combineReducers } from 'redux';


const articles = (
  state = {
    isLoading: false,
    items: []  
  },
  action
) => {
  switch (action.type) {
    case LOAD_ARTICLES_REQUEST:
      return {
        ...state, 
        isLoading: true,
      };
    case LOAD_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload,
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


const currentArticle = (
  state = {
    raw: {},
  }, 
  action) => {
  
  switch (action.type) {
    case GOTO_ARTICLE:
      return {
        ...state,
        raw: action.article,
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

// const currentArticle = (
//   state = {
    
//   },
//   action) => {

//   switch (action.type) {
//     default:
//       return state;
//   }
// };

// const articleCreation = (state = {
//   title: '',
//   category: '',
//   tags: {},
//   content: '',
//   errors: {},
// }, action) => {
//   switch (action.type) {
//     case INIT_CREATION_NEW_ARTICLE:
//       return {
//         ...state
//       };

//     case INIT_CREATION_NEW_ARTICLE_VERSION:
//       const { title, category, tags, jsonMetadata } = action.payload;
//       const { content }  = JSON.parse(jsonMetadata);
//       return {
//         ...state,
//         title,
//         category,
//         tags,
//         content
//       };
//   }
// };

// const createReducer = (initState, handlers) => {
//   return (state = initState, action) => {
//     if (handlers.hasOwnProperty(action.type)) {
//       return handlers[action.type](state, action);
//     } else {
//       return state;
//     }
//   };
// };

// const articleCreationReducer = createReducer({}, {
//   [INIT_CREATION_NEW_ARTICLE]: initCreationNewArticle,
// });

// const initCreationNewArticle = (articleCreationState, action) => {
//   return (articleCreationState, action.       ) => {

//   };
// };



const rootReducer = combineReducers({
  auth,
  articles,
  // currentArticle,
  articleCreation,
  router: routerReducer
});


export default rootReducer;