import { connect } from 'react-redux';
import { loadArticles } from '../actions';
import { getArticleCardDatas } from '../selectors';

import HomeComponent from '../components/Home';


const mapDispatchToProps = (dispatch) => {
  return {
    loadArticles: () => dispatch(loadArticles()),
  };
};

const mapStateToProps = (state) => {
  const { error, isLoading } = state.entities;
  return {
    error,
    cardDatas: getArticleCardDatas(state),
    isLoading,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);