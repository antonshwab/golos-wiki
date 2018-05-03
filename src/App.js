import React, { Component } from 'react';
import './App.css';
import * as B from 'reactstrap';
// import classnames from 'classnames';
import golos from 'golos-js';
import ModalLogIn from './components/ModalLogIn';
// import ArticleExplorer from './components/ArticlesExplorer';
import Main from './components/Main';
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
    
    this.state = {
      route: 'main'
    };
  }

  componentDidMount() {
    golos.config.set('websocket', 'wss://ws.testnet.golos.io');
    golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
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
    this.setState({
      currentRawArticle: ra,
    });
    this.switchRoute('readArticle');
  }

  renderRoute() {
    switch (this.state.route) {
      case 'main': return <Main switchRoute={ this.switchRoute } readArticle={ this.readArticle }/>;
      case 'readArticle': return <ReadArticle rawArticle={ this.state.currentRawArticle }/>;
      case 'createArticle': return <CreateArticle switchRoute={ this.switchRoute }/>;
      default: return <Main switchRoute={ this.switchRoute } readArticle={ this.readArticle }/>;
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
                href="/main"              
                id = 'main'
                onClick={this.switchRouteByActivePill}
                active={this.state.route === 'main'}
              >
                Main
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
