import React, { Component } from 'react';
import * as B from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { gotoArticle } from '../actions';

class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.onReadClick = this.onReadClick.bind(this);
  }

  onReadClick(e) {
    e.preventDefault();
    const { gotoArticle, article } = this.props;
    gotoArticle(article);
  }

  render() {
    const { title, author, body } = this.props.article;

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
            color="primary" 
            onClick={this.onReadClick}
          >
            Read
          </B.Button>
        </B.Card>
      </B.Col>
    );
  }
}

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { history } = ownProps;
  return {
    gotoArticle: (article) => {
      dispatch(gotoArticle);
      history.push(`/articles/${article.permlink}`);
    },

  };
};


export default withRouter(connect()(ArticleCard));