import React, { Component } from 'react';
import * as B from 'reactstrap';
import golos from 'golos-js';
import * as R from 'ramda';
import { Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';
import { fetchArticles } from '../helpers';

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('HandleClick on READ: ', this.props.rawArticle);
    this.props.readArticle(this.props.rawArticle);
  }

  render() {
    console.log('ArticleCard props: ', this.props);
    const {title, author, body, permlink } = this.props.rawArticle;
    const routeToArticle = `/articles/${permlink}`;

    return (
      <B.Col sm="4">
        <B.Card body>
          <B.CardTitle>
            {title} by {author}
          </B.CardTitle>
          <B.CardText>
            <div dangerouslySetInnerHTML={{__html: body.slice(0, 25)}}/>
          </B.CardText>

          <B.Button 
            to={routeToArticle} 
            color="primary" 
            tag={NavLink}
            onClick={this.handleClick}
          >
            Read
          </B.Button>
          {/* <B.NavLink to={routeToArticle} activeClassName='active' tag={NavLink}>Read</B.NavLink>           */}
        </B.Card>
      </B.Col>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawArticles: [],
    }
  }

  async componentDidMount() {
    const articles = await fetchArticles();
    console.log('Board componentDidMount with articles:', articles);
    this.setState({
      rawArticles: articles,
    })
    // TODO: would be great. try later...
    // const q = {
    //   // select_tags: ['wiki'],
    //   limit: 100,
    // };
    // golos.api.getDiscussionsByTrending(q, (err, res) => {
    //   if (!err) {
    //     console.log("getDiscussionsByTrending with tag 'wiki' result: ", res);
    //     this.setState({
    //       rawArticles: res,
    //     });    
    //   } else {
    //     console.error(err);
    //   }
    // });
    //
  }

  prepArticles(articles) {
    const wrappedToCol = articles.map((a, index) => {
      return (<ArticleCard
        key={index}
        rawArticle={a}
        readArticle={this.props.readArticle}
      />);
    });
    const groupedBy3 = R.splitEvery(3, wrappedToCol);
    const wrappedToRow = groupedBy3.map(group => <B.Row>{group}</B.Row>);
    return (<B.Container>{wrappedToRow}</B.Container>);
  }

  render() {
    console.log("Render HOME: ", this.props, this.state);
    const articles = this.prepArticles(this.state.rawArticles);
    return (
      <div>
        {articles}
      </div>
    );
  }
}

export default Board;