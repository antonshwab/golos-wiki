import golos from 'golos-js';
import { wait } from '../helpers';
import { fetchArticles, broadcastComment } from '../api';
import * as types from './actionTypes';

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

      console.log('submitNewArticle parentPermlink', parentPermlink);

      const initPermlink = `0-${permlink}`;
        
      const res = await broadcastComment({
        privateKey,
        parentAuthor,
        parentPermlink,
        author,
        permlink: initPermlink,
        title,
        body: 'article origin',
        jsonMetadata
      });

      dispatch({ 
       type: types.INIT_SUBMIT_NEW_ARTICLE_SUCCESS,
       payload: res
      });


      const { operations } = res;
      const [[, submittedResult ]] = operations;
      // const { author, body, json_metadata, parent_author, parent_permlink, permlink, title } = submittedResult;
      console.log('Submitted result', submittedResult);
      // const { parent_author, parent_permlink, } = submittedResult;
      
      await wait(25000);
    
      await dispatch(submitArticleVersion({
        parentAuthor: author,
        parentPermlink: initPermlink,
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


export const articleMetaDataChange = (fieldId, data) => {
  return {
    type: types.ARTICLE_META_DATA_CHANGE,
    payload: {
      fieldId,
      data
    },
  };
};


export const articleContentChange = (content) => {
  return {
    type: types.ARTICLE_CONTENT_CHANGE,
    payload: content,
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


