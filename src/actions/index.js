import golos from 'golos-js';
import { fetchArticles, broadcastComment, getDiscussionsByTrending, later, wait } from '../helpers';

export const LOAD_ARTICLES_REQUEST = 'LOAD_ARTICLES_REQUEST';
export const LOAD_ARTICLES_SUCCESS = 'LOAD_ARTICLES_SUCCESS';
export const LOAD_ARTICLES_FAILURE = 'LOAD_ARTICLES_FAILURE';

export const loadArticles = () => {
  return async (dispatch) => {

    try {
      dispatch({
        type: LOAD_ARTICLES_REQUEST
      });

      const response = await fetchArticles();

      dispatch({
        type: LOAD_ARTICLES_SUCCESS,
        payload: response,
      });

    } catch(error) {
      dispatch({
        type: LOAD_ARTICLES_FAILURE,
        error
      });
    }
  };
};

export const INIT_SUBMIT_NEW_ARTICLE_REQUEST = 'INIT_SUBMIT_NEW_ARTICLE_REQUEST';
export const INIT_SUBMIT_NEW_ARTICLE_SUCCESS = 'INIT_SUBMIT_NEW_ARTICLE_SUCCESS';
export const INIT_SUBMIT_NEW_ARTICLE_FAILURE = 'INIT_SUBMIT_NEW_ARTICLE_FAILURE';

export const submitNewArticle = ({
  parentAuthor,
  parentPermlink,
  permlink,
  title,
  body,
  jsonMetadata  
}, gotoArticleVersion) => {
  return async (dispatch, getState) => {

    try {
      dispatch({ type: INIT_SUBMIT_NEW_ARTICLE_REQUEST });      
      const { privateKey, author } = getState().auth;      

      console.log('submitNewArticle parentPermlink', parentPermlink);

      const initPermlink = `0-${permlink}`;
        
      const res = await broadcastComment({
        privateKey,
        parentAuthor,
        parentPermlink,
        author,
        permlink: initPermlink,
        title,
        body: 'genesis',
        jsonMetadata
      });

      dispatch({ 
       type: INIT_SUBMIT_NEW_ARTICLE_SUCCESS,
       payload: res
      });


      const { operations } = res;
      const [[, submittedResult ]] = operations;
      // const { author, body, json_metadata, parent_author, parent_permlink, permlink, title } = submittedResult;
      console.log('Sumbitted result', submittedResult);
      // const { parent_author, parent_permlink, } = submittedResult;
      
      await wait(25000);
    
      dispatch(submitArticleVersion({
        parentAuthor: author,
        parentPermlink: initPermlink,
        author,
        permlink,
        title,
        body,
        jsonMetadata
      }, gotoArticleVersion));

    } catch(e) {

      dispatch({ type: INIT_SUBMIT_NEW_ARTICLE_FAILURE, error: e });
    }
  
  };
};

export const SUBMIT_ARTICLE_VERSION_REQUEST = 'SUBMIT_ARTICLE_VERSION_REQUEST';
export const SUBMIT_ARTICLE_VERSION_SUCCESS = 'SUBMIT_ARTICLE_VERSION_SUCCESS';
export const SUBMIT_ARTICLE_VERSION_FAILURE = 'SUBMIT_ARTICLE_VERSION_FAILURE';

export const submitArticleVersion = ({
  parentAuthor,
  parentPermlink,
  permlink,
  title,
  body,
  jsonMetadata  
}, gotoArticleVersion) => {
  return async (dispatch, getState) => {

    dispatch({ 
      type: SUBMIT_ARTICLE_VERSION_REQUEST,
      payload: {
        parentAuthor,
        parentPermlink,
        permlink,
        title,
        body,
        jsonMetadata
      },
    });

    try {
      const { privateKey, author } = getState().auth;
    
      console.log('submitArticleVersion : ', {
        privateKey,
        parentAuthor,
        parentPermlink,
        author,
        permlink,
        title,
        body,
        jsonMetadata
      });

      const response = await broadcastComment({
        privateKey,
        parentAuthor,
        parentPermlink,
        author,
        permlink,
        title,
        body,
        jsonMetadata
      });

      await dispatch({ 
        type: SUBMIT_ARTICLE_VERSION_SUCCESS, 
        payload: { 
          response 
        } 
      });

      await dispatch(loadArticeVersions(parentAuthor, parentPermlink, gotoArticleVersion));

    } catch(e) {
      dispatch({ 
        type: SUBMIT_ARTICLE_VERSION_FAILURE, 
        error: e
      });
    }
  };
};

export const LOAD_CURRENT_ARTICLE_VERSIONS_REQUEST = 'LOAD_CURRENT_ARTICLE_VERSIONS_REQUEST';
export const LOAD_CURRENT_ARTICLE_VERSIONS_SUCCESS = 'LOAD_CURRENT_ARTICLE_VERSIONS_SUCCESS';
export const LOAD_CURRENT_ARTICLE_VERSIONS_FAILURE = 'LOAD_CURRENT_ARTICLE_VERSIONS_FAILURE';

export const loadArticeVersions = (parent, parentPermlink, gotoArticleVersion) => {
  return async (dispatch) => {
    try {
      dispatch({ 
        type: LOAD_CURRENT_ARTICLE_VERSIONS_REQUEST, 
        payload: {
          parent,
          parentPermlink
        } 
      });

      const response = await golos.api.getContentReplies(parent, parentPermlink);

      await dispatch({
        type: LOAD_CURRENT_ARTICLE_VERSIONS_SUCCESS,
        payload: {
          response, 
        }
      });

      gotoArticleVersion();

    } catch(e) {
      dispatch({
        type: LOAD_CURRENT_ARTICLE_VERSIONS_FAILURE,
        error: e
      });
    }

  };
};


// Article actions

export const GOTO_ARTICLE_VERSION = 'GOTO_ARTICLE_VERSION';
export const gotoArticleVersion = (permlink, switchRoute) => {
  return (dispatch) => {
    switchRoute();
    dispatch({
      type: GOTO_ARTICLE_VERSION,
      payload: {
        permlink,
      },
    });
  };
};
// export const gotoArticleVersion = (permlink) => {
//   return {
//     type: GOTO_ARTICLE_VERSION,
//     payload: {
//       permlink,
//     },
//   };
// };


export const ARTICLE_META_DATA_CHANGE = 'ARTICLE_META_DATA_CHANGE';
export const articleMetaDataChange = (fieldId, data) => {
  return {
    type: ARTICLE_META_DATA_CHANGE,
    payload: {
      fieldId,
      data
    },
  };
};


export const ARTICLE_CONTENT_CHANGE = 'ARTICLE_CONTENT_CHANGE';
export const articleContentChange = (content) => {
  return {
    type: ARTICLE_CONTENT_CHANGE,
    payload: content,
  };
};


export const INIT_CREATION_ARTICLE_VERSION = 'INIT_CREATION_ARTICLE_VERSION';
export const initCreationArticleVersion = (article) => {
  return {
    type: INIT_CREATION_ARTICLE_VERSION,
    payload: article,
  };
};

export const INIT_CREATION_NEW_ARTICLE = 'INIT_CREATION_NEW_ARTICLE';
export const initCreationNewArticle = () => {
  return {
    type: INIT_CREATION_NEW_ARTICLE,
  };
};


