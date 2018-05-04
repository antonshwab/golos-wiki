import React, { Component } from 'react';
import * as B from 'reactstrap';
import golos from 'golos-js';
import * as R from 'ramda';

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.readArticle(this.props.rawArticle);
  }

  render() {
    console.log('ArticleCard props: ', this.props);
    const {title, author, body, } = this.props.rawArticle;

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
            onClick={this.handleClick}
          >
            READ
          </B.Button>
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
    // TODO:
    // work around: fetch all posts for users test1-test10 with tag 'wiki'
    try {
      const query = {
        select_authors: ['test9'],
        select_tags: ['wiki'],
        limit: 100
      };
      const res = await golos.api.getDiscussionsByBlog(query);
      console.log('raw articles: ', res);
      this.setState({
        rawArticles: res,
      });
    } catch(e) {
      console.error(e);
    }
  
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
        readArticle={this.props.readArticle}
        rawArticle={a}
      />);
    });
    const groupedBy3 = R.splitEvery(3, wrappedToCol);
    const wrappedToRow = groupedBy3.map(group => <B.Row>{group}</B.Row>);
    return (<B.Container>{wrappedToRow}</B.Container>);
  }

  render() {
    const articles = this.prepArticles(this.state.rawArticles);
    return (
      <div>
        {articles}
      </div>
    );
  }
}

export default Board;