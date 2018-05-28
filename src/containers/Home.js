import React, { Component } from 'react';
import * as B from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadArticles } from '../actions';
import ArticlesBoard from '../components/ArticlesBoard';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadArticles();
  }

  render() {
    const { articles, isLoading, error } = this.props;
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
          articles={ articles } 
          isLoading={ isLoading }
        />
      </div>
    );
  }
}

Home.propTypes = {
  error: PropTypes.object,
  articles: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadArticles: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadArticles: () => dispatch(loadArticles()),
  };
};

const mapStateToProps = (state) => {
  const { items, error, isLoading } = state.articles;
  return {
    error: error,
    articles: items,
    isLoading,
    // isLoading: items === undefined,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);