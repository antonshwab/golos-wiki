import React, { Component } from 'react';
import * as B from 'reactstrap';
import golos from 'golos-js';
import * as R from 'ramda';

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.readArticle();
    // TODO:
    // this.props.readArticle(this.props.rawArticle)
    //    - switch route to READ ARTICLE to desplay article
    //    - render ReadArticle | Article comp-t
  }

  render() {
    // const {title, } = this.props.rawArticle
    const title = 'Article Title';
    const body = 'Article Body';

    return (
      <B.Col sm="4">
        <B.Card body>
          <B.CardTitle>
            {title}
          </B.CardTitle>
          <B.CardText>
            {body}
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
    // LOAD SOME ARTICLES from golos
    const query = {
      select_tags: ['wiki'],
      limit: 100
    };
    const rawArticles = await golos.api.getDiscussionsByTrending(query);
    console.log("rawArticles: ", rawArticles);
    this.setState({
      rawArticles: rawArticles,
    });
  }

  prepArticles(articles) {
    const wrappedToCol = articles.map((a, index) => {
      return <ArticleCard
        key={index} 
        readArticle={this.props.readArticle} 
        rawArticle={a}
      />
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