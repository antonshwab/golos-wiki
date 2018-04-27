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
    this.showLastArticleVersion = this.showLastArticleVersion.bind(this);

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
    // console.log("onChange fired with event info : ", e);
    const newContent = e.editor.getData();
    this.updateContent(newContent);
  }

  onBlur(e){
    // console.log("onBlur event called with event info:  ", e);
    // console.log("onBlur event called with event info:  ");
  }

  afterPaste(e){
    // console.log("afterPaste event called with event info: ", e);
  }

  async createArticle() {
    const wif = this.props.privateKey;
    const parentAuthor = '';
    const parentPermlink = 'nice-test-permlink';
    const permlink = 'nice-test-url';
    const author = this.props.username;
    const title = this.state.title;
    const body = this.state.content;

    const metadata = { // TODO: get tags from form with editor
      tags: ['nicetag1']
    };

    const jsonMetadata = JSON.stringify(metadata);
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
      console.log("CREATED ARTICLE: ", addedPost);
    } catch(err) {
      console.error("ERROR from CREATE ARTICLE: ", err);
    }
  }

  // async showArticleHistory() {
  //   // NOW it is not history of article, but only last one
  //   const author = this.state.username;
  //   const permlink = 'super-test-url2';
  //   try {
  //     const lastVersion = await golos.api.getContent(author, permlink);
  //     console.log("LAST Article version: ", lastVersion);
  //   } catch(e) {
  //     console.error("ERROR from showArticleHistory: ", e);
  //   }
  // }

  async showLastArticleVersion() {
    // NOW it is not history of article, but only last one
    const author = this.props.username;
    const permlink = 'nice-test-url';
    try {
      const lastVersion = await golos.api.getContent(author, permlink);
      console.log("LAST Article version: ", lastVersion);
    } catch(e) {
      console.error("ERROR from showLastARticleVersion: ", e);
    }
  }

  // async editArticle() {
  //   const privateKey = this.props.privateKey;
  //   //
  // }

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
          <Button
            color="primary"
            onClick={ this.showLastArticleVersion }
          >
            Show last version
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