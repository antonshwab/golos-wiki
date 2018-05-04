import React, { Component } from 'react';
import classnames from 'classnames';

import * as B from 'reactstrap';
import golos from 'golos-js';
import * as R from 'ramda';
import CreateArticle from './CreateArticle';

class RenderArticle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, author, body, } = this.props.rawArticle;

    return (
      <B.Container>
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{__html: body}}/>
      </B.Container>
    );
  }
}


class ReadArticle extends React.Component {
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
    const {title, author, body, } = this.props.rawArticle;
    console.log("YOU READ THIS ARTICLE: ", this.props.rawArticle);

    return (
      <div>
        <B.Nav tabs>
          <B.NavItem>
            <B.NavLink
              className={classnames({ active: this.state.activeTab === 'read' })}
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
              Edit source
            </B.NavLink>
          </B.NavItem>
          <B.NavItem>
            <B.NavLink
              className={classnames({ active: this.state.activeTab === 'viewHistory' })}
              onClick={() => { this.toggle('viewHistory'); }}
            >
              View history
            </B.NavLink>
          </B.NavItem>
        </B.Nav>
        <B.TabContent activeTab={this.state.activeTab}>

          <B.TabPane tabId="read">
            <RenderArticle rawArticle={this.props.rawArticle}/>        
          </B.TabPane>

          <B.TabPane tabId="edit">
            <CreateArticle
              // TODO: fill other form fields with prev values  
              content={body}
            />

          </B.TabPane>
          <B.TabPane tabId="viewHistory">
            History of article
          </B.TabPane>
        </B.TabContent>
      </div>
    );


  }
}

export default ReadArticle;