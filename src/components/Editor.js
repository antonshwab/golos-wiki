import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import golos from 'golos-js';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    // this.updateContent = this.updateContent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.state = {
      content: 'content',
      title: 'default article title',
    }
  }

  updateContent(newContent) {
    this.setState({
      content: newContent,
    })
  }

  onChange(e) {
    console.log("onChange fired with event info : ", e);
    const newContent = e.editor.getData();
    this.updateContent(newContent);
  }

  onBlur(e){
    // console.log("onBlur event called with event info:  ", e);
    console.log("onBlur event called with event info:  ");
  }

  afterPaste(e){
    console.log("afterPaste event called with event info: ", e);
  }

  async createArticle() {
    // const wif = this.props.privateKey; // TODO get privateKey in LogIn by masterpass
    const wif = '5KQkU7vhhqG1HK9FHVw4CuWeQE7b3MqWuyZBFkxKeDHmLPVFwry'; // for test1
    const parentAuthor = '';
    const parentPermlink = 'super-test-permlink';
    const permlink = 'super-test-url2';
    // const author = this.props.username;
    const author = 'test1';
    const title = this.state.title;
    const body = this.state.content;
    const jsonMetadata = '{}';
    console.log("HI from createArticle. Current private key: ", wif);
    console.log("HI from createArticle. Current article body: ", body);
    try {
      await golos.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata);
      
      const later = async (delay) => {
        return new Promise(function(resolve) {
          setTimeout(resolve, delay);
        });
      }

      await later(1000);
      const addedPost = await golos.api.getContent(author, permlink);
      console.log("CREATE ARTICLE: ", addedPost);
    } catch(err) {
      console.error("ERROR from CREATE ARTICLE: ", err);
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Button
            color="primary"
            onClick={ this.createArticle }
          >
            Create Article
          </Button>
        </Row>
        <Row>
          <CKEditor
            activeClass="p10"
            content={this.state.content}
            events={{
              "blur": this.onBlur,
              "afterPaste": this.afterPaste,
              "change": this.onChange,
            }}
          />
        </Row>
      </Container>

    );
  }

}


export default Editor;