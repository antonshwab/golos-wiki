import React, { Component } from 'react';
import * as B from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ReadArticle } from './ReadArticle';
import CreateNextArticleVersion from '../containers/CreateNextArticleVersion';

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
            <CreateNextArticleVersion
              baseOnVersion={this.props.currentVersion}
            />
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

export default Article;