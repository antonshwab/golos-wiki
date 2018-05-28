import * as R from 'ramda';
import golos from 'golos-js';

export const broadcastComment = ({ privateKey, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata }) => {
  return new Promise((resolve, reject) => {

    console.log('broadcastComment parentPermlink', parentPermlink);
    

    golos.broadcast.comment(privateKey, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function(err, result) {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });    
  });
};

export const getDiscussionsByTrending = (query) => {
  return new Promise((resolve, reject) => {
    golos.api.getDiscussionsByTrending(query, function(error, response) {
      if (!error) {
        resolve(response);
      } else {
        reject(error);
      }
    });
  });
};


export const fetchArticles = async (tags = []) => {
  try {
    // const authors = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10'];    
    const authors = ['beesocial-test', 'beesocial-test2', 'beesocial-test3', 'beesocial-test4'];
    const queries = authors.map((author) => {
      return {
        select_authors: [author],
        select_tags: [...tags, 'wiki'],
        limit: 100
      }
    });

    const nested = await Promise.all(queries.map(async query => {  
      return await golos.api.getDiscussionsByBlog(query);
    }));

    return R.flatten(nested);

  } catch(e) {
    console.error('ERROR in FETCH ARTICLES: ', e);
    throw(e);
  }
};


export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));