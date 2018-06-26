import { createSelector } from 'reselect';
import * as R from 'ramda';

const getOrigins = (state) => state.entities.origins;

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

    if (!origins || !versions) {
      return [];
    }

    return origins.allIds.map((id) => {
      const origin = origins.byId[id];
      const vs = origin.versions.map((vId) => versions.byId[vId]);
      //
      const countVotesSort = R.sortWith([R.descend(R.prop('net_votes'))]);
      const [maxVotedVersion] = countVotesSort(vs);
      // const mainVersion = {
      //   author: maxVotedVersion.author,
      //   permlink: maxVotedVersion.permlink,
      // };
      //
      return {
        origin,
        versions: vs,
        mainVersion: maxVotedVersion,
      };
    }); 
  }
);


export const getArticleCardDatas = createSelector(
  [getArticles],
  (articles) => {
    if (!articles) {
      return [];
    }
    return articles.map(({origin, versions, mainVersion}) => {
      
      const { articleContent } = JSON.parse(mainVersion.json_metadata);
      
      const previewContent = articleContent.slice(0, 20);
      return {
        originPermlink: origin.permlink,
        mainVersionPermlink: mainVersion.permlink,
        title: mainVersion.title,
        previewContent,
      };
    });
  }
);
