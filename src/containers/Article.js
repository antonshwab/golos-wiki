import * as R from 'ramda';
import { connect } from 'react-redux';

import { loadArticles } from '../actions';
import { getArticles } from '../selectors';
import ArticleComponent from '../components/Article';

const mapStateToProps = (state) => {
  // const { originPermlink, versionPermlink } = state.currentArticle;
  const { pathname } = state.router.location;
  const [,,originPermlink, versionPermlink] = pathname.split('/');

  const articles = getArticles(state);
  
  if (!articles || articles.length === 0) {
    return {
      isLoading: true,
    };
  }

  if (!originPermlink || !versionPermlink) {
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

const mapDispatchToProps = (dispatch) => {
  return {
    loadArticles: () => dispatch(loadArticles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComponent);