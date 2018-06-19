import * as R from 'ramda';
import golos from 'golos-js';
import { normalize } from 'normalizr';
import { articlesSchema } from './schema';


export const broadcastComment = ({ privateKey, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata }) => {
  return new Promise((resolve, reject) => {

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
        select_tags: [...tags, 'wikidev3'],        
        limit: 100
      }
    });

    const nested = await Promise.all(queries.map(async query => {  
      return await golos.api.getDiscussionsByBlog(query);
    }));

    const flatOriginsArticles = R.flatten(nested);

    const articles = await Promise.all(flatOriginsArticles.map(async origin => {
      const { author, permlink } = origin;
      
      const response = await golos.api.getContentReplies(author, permlink);

      const versions = response.filter(({json_metadata}) => {
        const { articleContent } = JSON.parse(json_metadata);
        return !!articleContent;
      });

      const versionsWithComments = await Promise.all(versions.map(async v => {
        console.log('versionWitComments. Author and permlink: ', v.author, v.permlink);
        return await golos.api.getContentReplies(v.author, v.permlink);
      }));

      console.log('versionWithComments: ', versionsWithComments);

      return { ...origin, versions };
    }));
    
    const normalizedArticles = normalize(articles, articlesSchema);
    
    return normalizedArticles;
  } catch(e) {
    console.error('ERROR in FETCH ARTICLES: ', e);
    throw(e);
  }
};