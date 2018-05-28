import React, { Component } from 'react';
import * as B from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CreateArticle from '../components/CreateArticle';
import { connect } from 'react-redux'
import { initCreationNewArticle, submitNewArticle } from '../actions';

class CrNewArticle extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initCreationNewArticle();
  }

  render() {
    return (
      <CreateArticle 
        submitArticle = { this.props.submitNewArticle }
        buttonText = {'Submit new article'}
      />
    );
  }
}


CrNewArticle.propTypes = {
  initCreationNewArticle: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => {
  return {
    initCreationNewArticle: () => dispatch(initCreationNewArticle),
    submitNewArticle: (data) => dispatch(submitNewArticle(data)),
  };
};


export default connect(null, mapDispatchToProps)(CrNewArticle);