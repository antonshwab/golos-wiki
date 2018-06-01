import React, { Component } from 'react';
import * as B from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux'
import { pickupArticleVersion } from '../actions';

const ArticleCard = ({ data, onReadClick }) => {
  const { title, previewContent } = data;
  return (
    <B.Col sm="4">
      <B.Card body>
        <B.CardTitle>
          {title}
        </B.CardTitle>
        <B.CardText>
          <B.Container dangerouslySetInnerHTML={{ __html: previewContent }}/>
        </B.CardText>

        <B.Button 
          color="primary" 
          onClick={onReadClick}
        >
          Read
        </B.Button>
      </B.Card>
    </B.Col>
  );

};

ArticleCard.propTypes = {
  onReadClick: PropTypes.func.isRequired,  
  data: PropTypes.shape({
    mainVersionPermlink: PropTypes.string,
    originPermlink: PropTypes.string,
    title: PropTypes.string,
    previewContent: PropTypes.string,
  }),
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onReadClick: async (event) => {
      event.preventDefault();
      const { originPermlink, versionPermlink } = ownProps.data;
      // await dispatch(pickupArticleVersion(articlePermlink, articleVersionPermlink));
      await dispatch(push(`articles/${originPermlink}/${versionPermlink}`));
    }
  };
};

export default connect(null, mapDispatchToProps)(ArticleCard);