import React from 'react';
import PropTypes from 'prop-types';
import ArticlesBoard from '../components/ArticlesBoard';

class Home extends React.Component {
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

export default Home;