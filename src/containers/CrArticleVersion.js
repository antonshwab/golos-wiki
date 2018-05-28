import React, { Component } from 'react';
import * as B from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CreateArticle from '../components/CreateArticle';
import { connect } from 'react-redux'
import { initCreationArticleVersion } from '../actions';

class CrArticleVersion extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initCreationArticleVersion(this.props.article);
  }

  render() {
    return (
      <CreateArticle
        buttonText={'Submit new version'}
      />
    );
  }
}


CrArticleVersion.propTypes = {
  article: PropTypes.object.isRequired,
  initCreateArticleVersion: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => {
  return {
    initCreationArticleVersion: (article) => dispatch(initCreationArticleVersion(article)),
  };
};


export default connect(null, mapDispatchToProps)(CrArticleVersion);