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

// TODO
// ADD work around for fetch wiki posts by users(test1-10) through getDiscussionsByBlog
// uses: 
// 1. Home - Board
// 2. SearchBar - search by tags in posts test1-test10

export {
  makePostAsync
};