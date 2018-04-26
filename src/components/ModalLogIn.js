import React, { Component } from 'react';
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


export class ModalLogIn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        form1KeepLogged: false,
        form1Username: {
          value: '',
          errors: [],
        },
        form1MasterPass: {
          value: '',
          errors: ''
        },
        form2KeepLogged: false,
        form2PrivateKey: {
          value: '',
          errors: ''
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
  
    resetFormsInputs() {
      this.setState({
        form1Username: {
          value: '',
          errors: [],
        },
        form1MasterPass: {
          value: '',
          errors: ''
        },
        form2PrivateKey: {
          value: '',
          errors: ''
        },
      })
    }
  
    checkLogIn1 = async (username, pass) => {
      const [account] = await golos.api.getAccounts([username]);
      const roles = ['posting'];
      let keys = await golos.auth.getPrivateKeys(username, pass, roles);
      console.log("RESPONE FROM checkLogIn1: ", keys);
  
      if (account && account.posting.key_auths[0][0] === keys.postingPubkey) {
        console.log("правильный логин и мастер-пароль!");
        this.props.saveUsername(username);
        this.resetFormsInputs();
        this.toggle();
      } else {
        console.log("не правильный логин и\или мастер-пароль!");
        this.setState({
          feedbackOnLogIn1:
              <p className="text-center text-warning">
                <small>
                  Wrong username or master password!
                </small>
              </p>
        });
      }
    };
  
    handleLogInSubmit1() {
      const isValidUsernameInput = this.state.form1Username.errors.length === 0 && this.state.form1MasterPass.value !== '';
      const isValidMasterPass = this.state.form1MasterPass.value !== '';
      if (!isValidUsernameInput && !isValidMasterPass) {
        this.setState({
          feedbackOnLogIn1:
              <p className="text-center text-warning">
                <small>
                  To Log In fill the form and do it right.
                </small>
              </p>
        });
      } else {
        const username = this.state.form1Username.value;
        const pass = this.state.form1MasterPass.value;
        this.checkLogIn1(username, pass);
      }
  
    }
  
    async checkLogIn2(privateKey) {
      try {
        const publicKey1 = await golos.auth.wifToPublic(privateKey);
        const [[username],] = await golos.api.getKeyReferences([publicKey1]);
        const [account] = await golos.api.getAccounts([username]);
        const [publicKey2,] = account.posting.key_auths[0];
        if (publicKey1 === publicKey2) {
          console.log("PRIVATE KEY is CORRECT!");
          this.props.savePrivateKey(privateKey);
          this.resetFormsInputs();
          this.toggle();
        } else {
          console.log("PRIVATE KEY is NOT CORRECT!");
          this.setState({
            feedbackOnLogIn2:
                <p className="text-center text-warning">
                  <small>
                    Wrong private key!
                  </small>
                </p>
          });
        }
      } catch (e) {
        console.error("Log in 2 GO WRO..NGGGGGGG!", e);
      }
    }
  
    handleLogInSubmit2() {
      const isValidForm2 = this.state.form2PrivateKey.errors.length === 0 && this.state.form2PrivateKey.value !== '';
      if (!isValidForm2) {
        this.setState({
          feedbackOnLogIn2:
            <p className="text-center text-warning">
              <small>
                To Log In fill the form and do it right.
              </small>
            </p>
        });
      } else {
        // const privateKey = "5KQkU7vhhqG1HK9FHVw4CuWeQE7b3MqWuyZBFkxKeDHmLPVFwry";
        const privateKey = this.state.form2PrivateKey.value;
        this.checkLogIn2(privateKey);
      }
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
  
    validateUsername = value => {
      let errors = [];
      let suffix = 'username should';
  
      if (!value) {
        const err = suffix.concat(' not be empty');
        errors.push(err);
      }
  
      if (value.length < 3) {
        const err = suffix.concat(' be longer');
        errors.push(err);
      }
  
      if (value.length > 16) {
        const err = suffix.concat(' be shorter');
        errors.push(err);
      }
  
      if (!/^[a-z]/.test(value)) {
        const err = suffix.concat(' start with a letter');
        errors.push(err);
      }
      if (!/^[a-z0-9-]*$/.test(value)) {
        const err = suffix.concat(' have only letters, digits or dashes');
        errors.push(err);
      }
      if (/--/.test(value)) {
        const err = suffix.concat(' have only one dash in a row');
        errors.push(err);
      }
      if (!/[a-z0-9]$/.test(value) && value.length === 16) {
        const err = suffix.concat(' end with a letter or digit');
        errors.push(err);
      }
      return errors;
    };
  
    validatePrivateKey = value => {
      let errors = [];
      let suffix = 'private key should';
  
      if (value.length !== 51) {
        const err = suffix.concat(` have length 51. Your key have length ${value.length}`);
        errors.push(err);
      }
  
      if (!/[a-zA-Z0-9]$/.test(value)) {
        const err = suffix.concat(' have only letters and/or digits');
        errors.push(err);
      }
  
      const fst2letters = value.slice(0, 2);
  
      if (fst2letters !== "5K") {
        const err = suffix.concat(' start with 5K');
        errors.push(err);
      }
  
      try {
        golos.auth.wifToPublic(value);
      } catch (e) {
        const err = suffix.concat(' has right checksum');
        errors.push(err);
      }
  
      return errors;
    };
  
    handleChangeUsernameInput(e) {
      const username = e.target.value;
      console.log("Change username input", username);
      const errors = this.validateUsername(username);
      console.log(errors);
      this.setState({
        form1Username: {
          value: username,
          errors: errors,
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
      const privateKey = e.target.value;
      console.log("Change private key input", privateKey);
      const errors = this.validatePrivateKey(privateKey);
      console.log("Private key validation errors:", errors);
      this.setState({
        form2PrivateKey: {
          value: privateKey,
          errors: errors,
        }
      });
    }
  
    render() {
      const isValidUsernameInput = this.state.form1Username.errors.length === 0;
      const usernameInputFeedback = isValidUsernameInput ? null : this.state.form1Username.errors.map(e => <p>{e}</p>);
  
      const isValidPrivateKeyInput = this.state.form2PrivateKey.errors.length === 0;
      const privateKeyInputFeedback = isValidPrivateKeyInput ? null : this.state.form2PrivateKey.errors.map(e => <p>{e}</p>);
  
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
                      valid={ isValidUsernameInput &&  this.state.form1Username.value !== ''}
                      invalid={ !isValidUsernameInput }
                      type="text"
                      placeholder="username"
                      value={ this.state.form1Username.value }
                      onChange={ this.handleChangeUsernameInput }
                    />
                    <FormFeedback
                      valid={ isValidUsernameInput }
                      invalid={ !isValidUsernameInput }
                    >
                      {usernameInputFeedback}
                    </FormFeedback>
                  </InputGroup>
                </FormGroup>
  
                <FormGroup>
                  <Input
                    valid={ this.state.form1MasterPass.value !== ''}
                    type="password"
                    placeholder="master"
                    value={ this.state.form1MasterPass.value }
                    onChange={ this.handleChangeMasterInput }
                  />
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
                    { this.state.feedbackOnLogIn1 }
                </Container>
              </Form>
  
              <hr></hr>
              <p className="text-center"><small>OR</small></p>
              <p className="text-center">Please enter only your private posting key</p>
  
              <Form onSubmit={ this.handleLogInSubmit2 }>
                <FormGroup>
                  <Input
                    valid={ isValidPrivateKeyInput && this.state.form2PrivateKey.value !== ''}
                    invalid={ !isValidPrivateKeyInput }
                    type="password"
                    placeholder="private key"
                    value={ this.state.form2PrivateKey.value }
                    onChange={ this.handleChangePrivateKeyInput }
                  />
                  <FormFeedback
                    valid={ isValidPrivateKeyInput }
                    invalid={ !isValidPrivateKeyInput }
                  >
                    {privateKeyInputFeedback}
                  </FormFeedback>
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
                  { this.state.feedbackOnLogIn2 }
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
                    <Button 
                      color="primary" 
                      href="https://golos.io/create_account"
                    >
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