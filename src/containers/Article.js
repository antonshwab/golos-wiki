import React, { Component } from 'react';
import * as B from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { ReadArticle } from '../components/ReadArticle';
import CrArticleVersion from './CrArticleVersion';

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
              className={classnames({ active: this.state.activeTab === 'viewHistory' })}
              onClick={() => { this.toggle('viewHistory'); }}
            >
              Versions
            </B.NavLink>
          </B.NavItem>

        </B.Nav>

        <B.TabContent activeTab={this.state.activeTab}>

          <B.TabPane tabId="read">
            <h1>READ article here!</h1>
            <ReadArticle 
              currentVersion={this.props.currentVersion}
              versions={this.props.versions}
            />        
          </B.TabPane>

          <B.TabPane tabId="edit">
            <h1>Create new article version here!</h1>
            {/* <CrArticleVersion
              baseOnVersion={this.props.currentVersion}
            /> */}
          </B.TabPane>

          <B.TabPane tabId="viewHistory">
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
};

const mapStateToProps = (state) => {
  const { currentVersion, versions } = state.currentArticle;
  return {
    currentVersion: state.currentArticle,
    versions
  };
};


export default withRouter(connect(mapStateToProps)(Article));