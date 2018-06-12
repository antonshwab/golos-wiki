import React from 'react';
import * as B from 'reactstrap';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import ArticleCard from '../components/ArticleCard';


const ArticlesBoard = ({ cardDatas }) => {

  if (!cardDatas || cardDatas.length === 0) {
    return (<B.Container><h3>No articles</h3></B.Container>);
  }

  const articleCards = cardDatas.map((data, index) => {
    return (<ArticleCard
      key={ index }
      data={ data }  
    />);
  });

  const groupedBy3 = R.splitEvery(3, articleCards);
  const wrappedToRows = groupedBy3.map((group, index) => <B.Row key={ index }>{ group }</B.Row>);
  return (<B.Container>{ wrappedToRows }</B.Container>);
}

ArticlesBoard.propTypes = {
  cardDatas: PropTypes.arrayOf(PropTypes.shape({
    mainVersionPermlink: PropTypes.string,
    originPermlink: PropTypes.string,
    title: PropTypes.string,
    previewContent: PropTypes.string,
  })).isRequired,
};

export default ArticlesBoard;