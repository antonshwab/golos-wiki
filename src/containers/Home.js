import React, { Component } from 'react';
import * as B from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadArticles } from '../actions';
import ArticlesBoard from '../components/ArticlesBoard';
import { getArticleCardDatas } from '../selectors';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadArticles();
  }

  render() {
    const { cardDatas, isLoading, error } = this.props;
    if (error) {
      return (
        <b>{error.toString}</b>
      );
    }
    if (isLoading) {
      return (
        <h1>Loading...</h1>
      );
    }
    return (
      <div>
        {/* <Explore /> */}
        <ArticlesBoard 
          cardDatas={ cardDatas } 
          isLoading={ isLoading }
        />
      </div>
    );
  }
}

Home.propTypes = {
  error: PropTypes.object,
  cardDatas: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadArticles: PropTypes.func.isRequired,
};

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


export default connect(mapStateToProps, mapDispatchToProps)(Home);