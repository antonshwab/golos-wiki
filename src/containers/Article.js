import React, { Component } from 'react';
import * as B from 'reactstrap';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux'
import classnames from 'classnames';
import { ReadArticle } from '../components/ReadArticle';
import CrArticleVersion from './CrArticleVersion';
import { getArticles } from '../selectors';

class Article extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'read',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

    console.log('sdfasdf');

    if (!this.props.isExist) {
      return (<h1>Article not found</h1>);
    }

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
          </B.TabPane>

          <B.TabPane tabId="edit">
            <h1>Create new article version here!</h1>
            {/* <CrArticleVersion
              baseOnVersion={this.props.currentVersion}
            /> */}
          </B.TabPane>

          <B.TabPane tabId="versions">
            <h1>Article versions here</h1>
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
};

const mapStateToProps = (state) => {
  const { originPermlink, versionPermlink } = state.currentArticle;
  const articles = getArticles(state);
  
  if (!originPermlink || !versionPermlink || !articles || articles.length === 0) {
    return {
      isExist: false,
    };
  }

  const { origin, versions } = R.find((a) => a.origin.permlink === originPermlink)(articles);

  if (!origin || !versions) {
    return {
      isExist: false,
    };
  }

  const currentVersion = R.find((v) => v.permlink === versionPermlink)(versions);

  if (!currentVersion) {
    return {
      isExist: false,
    };
  }

  return {
    currentVersion,
    origin,
    versions,
    isExist: true,  
  };
};

export default connect(mapStateToProps)(Article);