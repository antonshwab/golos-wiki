import * as R from 'ramda';
import { connect } from 'react-redux';
import { getArticles } from '../selectors';

import ArticleComponent from '../components/Article';

const mapStateToProps = (state) => {
  const { originPermlink, versionPermlink } = state.currentArticle;
  const articles = getArticles(state);
  
  if (!originPermlink || !versionPermlink || !articles || articles.length === 0) {
    return {
      isExist: false,
    };
  }

  const { origin, versions } = R.find((a) => a.origin.permlink === originPermlink)(articles);

  if (!origin || !versions) {
    return {
      isExist: false,
    };
  }

  const currentVersion = R.find((v) => v.permlink === versionPermlink)(versions);

  if (!currentVersion) {
    return {
      isExist: false,
    };
  }

  return {
    currentVersion,
    origin,
    versions,
    isExist: true,  
  };
};

export default connect(mapStateToProps)(ArticleComponent);