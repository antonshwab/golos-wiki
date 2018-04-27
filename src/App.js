import React, { Component } from 'react';
import './App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  FormGroup,
  Label,
  Form,
  FormFeedback,
  Alert
} from 'reactstrap';
import golos from 'golos-js';
import ModalLogIn from './components/ModalLogIn';
import Editor from './components/Editor';
import ArticleExplorer from './components/ArticlesExplorer';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.logOut = this.logOut.bind(this);
    this.saveUsername = this.saveUsername.bind(this);
    this.savePrivateKey = this.savePrivateKey.bind(this);

    this.state = {
      isOpen: false,
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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
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
        <Button
          color="primary"
          onClick={this.logOut}
        >
          Log Out
        </Button>
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

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Golos-Wiki</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>
                  { this.renderLogInOut() }
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Editor
          privateKey={'5Hvp79CaQrYUD9d33VvdtWY5BhyimS4t5vMDCBJE1WsTUUPuu1F'}
          username={'test3'}
        />

        <ArticleExplorer />
      </div>
    );
  }
}

export default App;
