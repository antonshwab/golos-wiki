import React, { Component } from 'react';
import './App.css';
import * as B from 'reactstrap';
// import classnames from 'classnames';
// import golos from 'golos-js';
import ModalLogIn from './components/ModalLogIn';
// import ArticleExplorer from './components/ArticlesExplorer';
import Home from './components/Home';
import CreateArticle from './components/CreateArticle';
import ReadArticle from './components/ReadArticle';

class App extends Component {
  constructor(props) {
    super(props);

    this.switchRouteByActivePill = this.switchRouteByActivePill.bind(this);
    this.switchRoute = this.switchRoute.bind(this);
    this.saveUsername = this.saveUsername.bind(this);
    this.savePrivateKey = this.savePrivateKey.bind(this);
    this.logOut = this.logOut.bind(this);
    this.readArticle = this.readArticle.bind(this);
    
    this.state = {
      route: 'home',
      // username: 'test8',
      // privateKey: '5J1kGxcN1fhSSwBBJDFKDD8pExrBT7idSs7fr3Am4AFpah7srzU',
      // username: 'test1',      
      // privateKey: '5KQkU7vhhqG1HK9FHVw4CuWeQE7b3MqWuyZBFkxKeDHmLPVFwry',
      username: 'test9',      
      privateKey: '5KaMwjnNMxda7qg3XmB8WVtVEDUQyv4h1jMaeuomaBRFwCcH4CF',
    };
  }

  saveUsername(username) {
    this.setState({
      username: username,
    })
  }

  savePrivateKey(privateKey) {
    this.setState({
      privateKey: privateKey,
    })
  }

  logOut(e) {
    e.preventDefault();
    console.log("LOG OUT");
    this.setState({
      username: null,
      privateKey: null,
    })
  }

  renderLogInOut() {
    if (this.state.username || this.state.privateKey) {
      return (
        <B.Button
          color="primary"
          onClick={this.logOut}
        >
          Log Out
        </B.Button>
      );
    }
    return (
      <ModalLogIn 
        buttonLabel="Log In"
        saveUsername={ this.saveUsername }
        savePrivateKey={ this.savePrivateKey }
      />
    );
  }

  switchRouteByActivePill(e) {
    e.preventDefault();
    const id = e.target.id;
    this.setState({
      route: id,
    });
  }

  switchRendererByActiveNavItem() {
    const route = this.state.activePill;
    this.setState({
      route: route,
    });
  }

  switchRoute(r) {
    this.setState({
      route: r,
    });
  }

  readArticle(ra) {
    console.log('read article handler', ra);
    this.setState({
      currentRawArticle: ra,
    });
    this.switchRoute('readArticle');
  }

  renderRoute() {
    switch (this.state.route) {
    case 'home': 
    return (
      <Home 
        switchRoute={ this.switchRoute } 
        readArticle={ this.readArticle }
      />);
    case 'readArticle': 
    return (
      <ReadArticle 
        rawArticle={ this.state.currentRawArticle }
      />
    );
    case 'createArticle': 
    return (
      <CreateArticle 
        username={this.state.username}
        privateKey={this.state.privateKey}
        switchRoute={ this.switchRoute }
      />
    );
    default: 
      return <Home switchRoute={ this.switchRoute } readArticle={ this.readArticle }/>;
    }
  }

  render() {
    
    return (
      <div>
        <B.Navbar color="light" light expand="md">
          <B.NavbarBrand href="/">Golos-Wiki</B.NavbarBrand>
          <B.Nav pills>
            <B.NavItem>
              <B.NavLink
                href="/home"              
                id = 'home'
                onClick={this.switchRouteByActivePill}
                active={this.state.route === 'home'}
              >
                Home
              </B.NavLink>
            </B.NavItem>
            <B.NavItem>
              <B.NavLink 
                href="/createArticle"
                id = 'createArticle'
                onClick={this.switchRouteByActivePill}                
                active={this.state.route === 'createArticle'}
              >
                Create Article
              </B.NavLink>
            </B.NavItem>
          </B.Nav>
          <B.Nav 
            pills
            className="ml-auto" 
            navbar
          >
            <B.NavItem>
              <B.NavLink>
                { this.renderLogInOut() }
              </B.NavLink>
            </B.NavItem>
          </B.Nav>
        </B.Navbar>

        {this.renderRoute()}
      </div>
    );
  }
}

export default App;
