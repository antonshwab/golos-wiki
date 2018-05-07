import * as R from 'ramda';
import golos from 'golos-js';

const makePostAsync = (wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata) => {
  return new Promise((resolve, reject) => {
    golos.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function(err, result) {
      if (!err) {
        // console.log('comment', result);
        resolve(result);
      } else {
        // console.error(err);
        reject(err);
      }
    });    
  });
};

const fetchArticles = async (tags = []) => {
  try {
    const authors = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10'];
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
    console.error(e);
  }
};

export {
  makePostAsync,
  fetchArticles
};