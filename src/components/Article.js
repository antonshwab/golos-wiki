import React, { Component } from 'react';
import * as B from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ReadArticle } from './ReadArticle';
import CreateNextArticleVersion from '../containers/CreateNextArticleVersion';
import VersionsList from './VersionsList';
import CreateComment from '../containers/CreateComment';
import Comments from '../components/Comments';
import Voting from '../containers/Voting';

class Article extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleCreateComment = this.toggleCreateComment.bind(this);
    this.state = {
      activeTab: 'read',
      showCreateComment: false,
    };
  }

  componentDidMount() {
    if (!this.props.isExist) {
      this.props.loadArticles();
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  toggleCreateComment() {
    this.setState({
      showCreateComment: !this.state.showCreateComment,
    });
  }

  render() {
    if (this.props.isLoading) {
      return (<h1>Loading...</h1>);      
    }

    if (!this.props.isExist) {
      return (<h1>Article not found</h1>);
    }

    const { author, permlink, net_votes } = this.props.currentVersion;


    return (
      <B.Container>
        <B.Nav tabs>
          <B.NavItem>

            <B.NavLink
              className={({ active: this.state.activeTab === 'read' })}
              onClick={() => { this.toggle('read'); }}
            >
              Read
            </B.NavLink>
          </B.NavItem>

          <B.NavItem>
            <B.NavLink
              className={classnames({ active: this.state.activeTab === 'edit' })}
              onClick={() => { this.toggle('edit'); }}
            >
              Edit
            </B.NavLink>
          </B.NavItem>

          <B.NavItem>
            <B.NavLink
              className={classnames({ active: this.state.activeTab === 'versions' })}
              onClick={() => { this.toggle('versions'); }}
            >
              Versions
            </B.NavLink>
          </B.NavItem>

        </B.Nav>

        <B.TabContent activeTab={this.state.activeTab}>

          <B.TabPane tabId="read">
            <ReadArticle
              currentVersion={this.props.currentVersion}
            />

            <Voting 
              author={author}
              permlink={permlink}
              votesCount={net_votes}
            />

            <B.Button
              color="info"
              size='sm'
              onClick={this.toggleCreateComment}
            >
              {!this.state.showCreateComment ? 'New Comment' : 'Hide'}
            </B.Button>

            <CreateComment
              parentAuthor={author}
              parentPermlink={permlink}
              isShow={ this.state.showCreateComment }
            />

            <Comments comments={this.props.currentVersion.comments}/>
            
          </B.TabPane>

          <B.TabPane tabId="edit">
            <CreateNextArticleVersion
              baseOnVersion={this.props.currentVersion}
            />
          </B.TabPane>

          <B.TabPane tabId="versions">
            <VersionsList
              versions={this.props.versions}
            />
          </B.TabPane>

        </B.TabContent>
      </B.Container>
    );
  }
}

Article.propTypes = {
  currentVersion: PropTypes.object.isRequired,
  versions: PropTypes.array.isRequired,
  origin: PropTypes.object.isRequired,
  isExist: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Article;