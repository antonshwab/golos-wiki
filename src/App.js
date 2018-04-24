import React, { Component } from 'react';
import logo from './logo.svg';
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
  FormFeedback
} from 'reactstrap';
import {
  AvField,
  AvForm
} from 'availity-reactstrap-validation';


class ModalSign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form1KeepLogged: false,
      form1Username: {
        value: '',
        errMsg: ''
      },
      form1MasterPass: {
        value: '',
        errMsg: ''
      },
      form2KeepLogged: false,
      form2PrivateKey: {
        value: '',
        errMsg: ''
      },
      modal: false,
    };

    this.toggle = this.toggle.bind(this);

    this.handleChangeUsernameInput = this.handleChangeUsernameInput.bind(this);
    this.handleChangeMasterInput = this.handleChangeMasterInput.bind(this);
    this.handleChangePrivateKeyInput = this.handleChangePrivateKeyInput.bind(this);

    this.handleChangeKeepLoggedInput1 = this.handleChangeKeepLoggedInput1.bind(this);
    this.handleChangeKeepLoggedInput2 = this.handleChangeKeepLoggedInput2.bind(this);    
    
    this.handleLogInSubmit1 = this.handleLogInSubmit1.bind(this);
    this.handleLogInSubmit2 = this.handleLogInSubmit2.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleLogInSubmit1() {
    console.log("BOOO! 1", "HERE ALL INPUT DATA");
    // validate form 1

    this.toggle();
  }

  handleLogInSubmit2() {
    console.log("BOOO! 2", "HERE ALL INPUT DATA");
    // validate form 2    
    this.toggle();
  }

  handleChangeKeepLoggedInput1() {
    console.log("KeepLoggedInput1", this.state.form1KeepLogged);
    this.setState({
      form1KeepLogged: !this.state.form1KeepLogged,
    });
  }

  handleChangeKeepLoggedInput2() {
    console.log("KeepLoggedInput2", this.state.form2KeepLogged);
    this.setState({
      form2KeepLogged: !this.state.form2KeepLogged,
    });
  }

  handleChangeUsernameInput(e) {
    console.log("Change username input", e.target.value);
    this.setState({
      form1Username: {
        value: e.target.value,
        errMsg: '',
      }
    });
  }

  handleChangeMasterInput(e) {
    console.log("Change master pass input", e.target.value);
    this.setState({
      form1MasterPass: {
        value: e.target.value,
        errMsg: '',
      }
    });
  }

  handleChangePrivateKeyInput(e) {
    console.log("Change private key input", e.target.value);
    this.setState({
      form2PrivateKey: {
        value: e.target.value,
        errMsg: '',
      }
    });
  }

  render() {
    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>

        <Modal
          modalTransition={{ timeout: 1 }}
          backdropTransition={{ timeout: 1 }}
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalBody>
            <p className="text-center">Please enter your login and master password</p>

            <Form onSubmit={ this.handleLogInSubmit1 }>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="username"
                    value={ this.state.form1Username.value }
                    onChange={ this.handleChangeUsernameInput }
                  />
                </InputGroup>
                <FormFeedback>You will not be able to see this</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Input
                  type="password"
                  placeholder="master"
                  value={ this.state.form1MasterPass.value }
                  onChange={ this.handleChangeMasterInput }
                />
                <FormFeedback>You will not be able to see this</FormFeedback>
              </FormGroup>
              
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    onChange={ this.handleChangeKeepLoggedInput1 }
                  />
                  {' '}
                  <small>Keep me logged</small>
                </Label>
              </FormGroup>

              <Container>
                <Row className="justify-content-center">
                  <Col sm='auto'>
                    <Button
                      color="primary"
                      onClick={ this.handleLogInSubmit1 }
                    >
                      Log In
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>

              <hr></hr>
              <p className="text-center"><small>OR</small></p>
              <p className="text-center">Please enter only your private posting key</p>

            <Form onSubmit={ this.handleLogInSubmit2 }>
              <FormGroup>
                <Input
                  type="password"
                  placeholder="private"
                  value={ this.state.form2PrivateKey.value }
                  onChange={ this.handleChangePrivateKeyInput }
                />
                <FormFeedback>You will not be able to see this</FormFeedback>
              </FormGroup>

              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    onChange={ this.handleChangeKeepLoggedInput2 }
                  />
                  {' '}
                  <small>Keep me logged</small>
                </Label>
              </FormGroup>

              <br />
              <Container>
                <Row className="justify-content-center">
                  <Col sm='auto'>
                    <Button
                      color="primary"
                      onClick={ this.handleLogInSubmit2 }
                    >
                      Log In 
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Container>
              <Row className="justify-content-center">
                <p className="text-center"><small>Don't have an account?</small></p>
              </Row>

              <Row className="justify-content-center">
                <Col xl="auto">
                  <Button color="primary" onClick={this.toggle}>
                    Sign Up
                  </Button>
                </Col>
              </Row>

            </Container>
          </ModalFooter>

        </Modal>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
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
                  <ModalSign buttonLabel="Log In"/>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default App;
