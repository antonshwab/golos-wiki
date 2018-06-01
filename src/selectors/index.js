import { createSelector } from 'reselect';

// const getOrigins = (state) => state.entities.origins;
const getOrigins = (state) => {
  console.log('getOrigins: ', state.entities);
  return state.entities.origins;
};


const getVersions = (state) => state.entities.versions;

// export const getMainVersion = createSelector(
//   [getVersions], 
//   (versions) => {
//     const { byId, allIds } = versions;
//     //TODO make proper characteristic for choosing main version    
//     const [ mainVersion ] = allIds;
//     return byId[mainVersion];
//   }
// );

export const getArticles = createSelector(
  [getOrigins, getVersions],
  (origins, versions) => {
    console.log('getArticlesSelector: ', origins);
    return origins.allIds.map((id) => {
      const origin = origins.byId[id];
      const vs = origin.versions.map((vId) => versions.byId[vId]);
      return {
        origin,
        versions: vs,
        // TODO: with comments
      };
    }); 
  }
);


export const getArticleCardDatas = createSelector(
  [getArticles],
  (articles) => {
    return articles.map(({origin, versions}) => {
      // TODO proper choose of main version
      // workaround: choose 1st version
      const [mainVersion] = versions;
      const title = mainVersion.title;
      const { articleContent } = JSON.parse(mainVersion.json_metadata);
      // TODO getting previewContent without ugly html-tags
      const previewContent = articleContent.slice(0, 20);
      return {
        originPermlink: origin.permlink,
        mainVersionPermlink: mainVersion.permlink,
        title,
        previewContent,
      };
    });
  }
);