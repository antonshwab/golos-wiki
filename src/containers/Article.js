import React, { Component } from 'react';
import * as B from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
            {/* <ReadArticle 
              article={this.props.article}
            />         */}
          </B.TabPane>

          <B.TabPane tabId="edit">
            <CrArticleVersion
              article={this.props.article}
            />
          </B.TabPane>

          <B.TabPane tabId="viewHistory">
            History of article
          </B.TabPane>

        </B.TabContent>
      </B.Container>
    );
  }
}

Article.propTypes = {
  article: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    article: state.currentArticle,
  };
};


export default connect(mapStateToProps)(Article);