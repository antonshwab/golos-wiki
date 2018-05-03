import React, { Component } from 'react';
import * as B from 'reactstrap';
import golos from 'golos-js';
import * as R from 'ramda';


class ReadArticle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const article = this.props.rawArticle;
    console.log("HOW YOU READ THIS ARTICLE: "), article;
    return (
      <h1>article</h1>
    );
  }
}

export default ReadArticle;