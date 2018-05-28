import React, { Component } from 'react';
import * as B from 'reactstrap';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import ArticleCard from '../containers/ArticleCard';


class ArticlesBoard extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { articles } = this.props;

    if (!articles || articles.length === 0) {
      return (<B.Container><h3>No articles</h3></B.Container>);
    }
  
    const articleCards = articles.map((article, index) => {
      return (<ArticleCard
        key={ index }
        article={ article }
      />);
    });
  
    const groupedBy3 = R.splitEvery(3, articleCards);
    const wrappedToRows = groupedBy3.map((group, index) => <B.Row key={ index }>{ group }</B.Row>);
    return (<B.Container>{ wrappedToRows }</B.Container>);
  }
}

ArticlesBoard.propTypes = {
  articles: PropTypes.array.isRequired,
};

export default ArticlesBoard;