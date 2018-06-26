import golos from 'golos-js';
import { wait } from '../utils';
import { fetchArticles, broadcastComment, broadcastVote } from '../api';
import * as types from './actionTypes';

export const voteUp = (authorVoteFor, permlinkVoteFor) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.VOTE_UP_START,
      });

      const { privateKey, author } = getState().auth;      

      const weight = 10000;

      const result = await broadcastVote({
        privateKey,
        voter: author,
        author: authorVoteFor,
        permlink: permlinkVoteFor,
        weight, 
      });

      dispatch({
        type: types.VOTE_UP_SUCCESS,
        payload: result,
      });

      await dispatch(loadArticles());

    } catch(error) {
      dispatch({
        type: types.VOTE_UP_FAILURE,
        error,
      });
    }
  };
};

export const voteDown = (authorVoteFor, permlinkVoteFor) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: types.VOTE_DOWN_START,
      });

      const { privateKey, author } = getState().auth;      

      const weight = -10000;

      const result = await broadcastVote({
        privateKey,
        voter: author,
        author: authorVoteFor,
        permlink: permlinkVoteFor,
        weight, 
      });

      dispatch({
        type: types.VOTE_DOWN_SUCCESS,
        payload: result,
      });

      await dispatch(loadArticles());

    } catch(error) {
      dispatch({
        type: types.VOTE_DOWN_FAILURE,
        error,
      });
    }
  };
};

export const loadArticles = () => {
  return async (dispatch) => {

    try {
      dispatch({
        type: types.LOAD_ARTICLES_REQUEST
      });

      const { entities, result } = await fetchArticles();
      const { origins, versions } = entities;
      const payload = { origins, versions, result};

      dispatch({
        type: types.LOAD_ARTICLES_SUCCESS,
        payload,
      });

    } catch(error) {
      dispatch({
        type: types.LOAD_ARTICLES_FAILURE,
        error
      });
    }
  };
};

export const submitNewArticle = ({
  parentAuthor,
  parentPermlink,
  permlink,
  title,
  body,
  jsonMetadata  
}) => {
  return async (dispatch, getState) => {

    try {
      dispatch({ type: types.INIT_SUBMIT_NEW_ARTICLE_REQUEST });      
      const { privateKey, author } = getState().auth;      

      const originPermlink = `0-${permlink}`;
        
      const res = await broadcastComment({
        privateKey,
        parentAuthor,
        parentPermlink,
        author,
        permlink: originPermlink,
        title,
        body: 'article origin',
        jsonMetadata
      });

      dispatch({ 
       type: types.INIT_SUBMIT_NEW_ARTICLE_SUCCESS,
       payload: res
      });

      await wait(25000);
    
      await dispatch(submitArticleVersion({
        parentAuthor: author,
        parentPermlink: originPermlink,
        author,
        permlink,
        title,
        body,
        jsonMetadata
      }));

    } catch(e) {

      dispatch({ type: types.INIT_SUBMIT_NEW_ARTICLE_FAILURE, error: e });
    }
  
  };
};


export const submitArticleVersion = ({
  parentAuthor,
  parentPermlink,
  permlink,
  title,
  body,
  jsonMetadata  
}) => {
  return async (dispatch, getState) => {

    dispatch({ 
      type: types.SUBMIT_ARTICLE_VERSION_REQUEST,
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
        type: types.SUBMIT_ARTICLE_VERSION_SUCCESS, 
        payload: { 
          response 
        } 
      });

      await dispatch(loadArticles());

    } catch(e) {
      dispatch({ 
        type: types.SUBMIT_ARTICLE_VERSION_FAILURE, 
        error: e
      });
    }
  };
};

export const submitComment = ({
  parentAuthor,
  parentPermlink,
  permlink,
  title,
  body,
  jsonMetadata  
}) => {
  return async (dispatch, getState) => {

    dispatch({ 
      type: types.SUBMIT_COMMENT_REQUEST,
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
        type: types.SUBMIT_COMMENT_SUCCESS, 
        payload: { 
          response 
        } 
      });

      await dispatch(loadArticles());

    } catch(e) {
      dispatch({ 
        type: types.SUBMIT_COMMENT_FAILURE, 
        error: e
      });
    }
  };
}; 

export const loadArticeVersions = (parent, parentPermlink) => {
  return async (dispatch) => {
    try {
      dispatch({ 
        type: types.LOAD_CURRENT_ARTICLE_VERSIONS_REQUEST, 
        payload: {
          parent,
          parentPermlink
        } 
      });

      const response = await golos.api.getContentReplies(parent, parentPermlink);

      await dispatch({
        type: types.LOAD_CURRENT_ARTICLE_VERSIONS_SUCCESS,
        payload: {
          response, 
        }
      });

    } catch(e) {
      dispatch({
        type: types.LOAD_CURRENT_ARTICLE_VERSIONS_FAILURE,
        error: e
      });
    }

  };
};


export const pickupArticleVersion = (articlePermlink, articleVersionPermlink) => {
  return {
    type: types.PICKUP_ARTICLE_VERSION,
    payload: {
      articlePermlink,
      articleVersionPermlink,
    },
  };
};

export const initCreationArticleVersion = (article) => {
  return {
    type: types.INIT_CREATION_ARTICLE_VERSION,
    payload: article,
  };
};

export const initCreationNewArticle = () => {
  return {
    type: types.INIT_CREATION_NEW_ARTICLE,
  };
};


