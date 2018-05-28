import React from 'react';
import * as B from 'reactstrap';
import { Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';


export default () => (
  <B.Navbar color="light" light expand="md">
    <B.NavbarBrand href="/">Golos-Wiki</B.NavbarBrand>
    <B.Nav pills>
      <B.NavItem>
        <B.NavLink exact to="/" activeClassName="active" tag={NavLink}>Home</B.NavLink>              
      </B.NavItem>
      <B.NavItem>
        <B.NavLink to="/articles/createNew" activeClassName="active" tag={NavLink}>Create Article</B.NavLink>
      </B.NavItem>
    </B.Nav>
    <B.Nav 
      pills
      className="ml-auto" 
      navbar
    >
      <B.NavItem>
        <B.NavLink>
          {/* { this.renderLogInOut() } */}
        </B.NavLink>
      </B.NavItem>
    </B.Nav>
  </B.Navbar>
);