import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
import * as B from 'reactstrap';
import { Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';
import { AvBaseInput,
  AvFeedback,
  AvField,
  AvForm,
  AvGroup,
  AvInput,
  AvInputContainer,
  AvRadio,
  AvRadioGroup } from 'availity-reactstrap-validation';
import * as R from 'ramda';
import golos from 'golos-js';
import { makePostAsync } from '../helpers';

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      category: '',
      tags: {},
      content: '',
    };

    this.onFormChange = this.onFormChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.createArticle = this.createArticle.bind(this);
  }

  onFormChange(e) {
    const id = e.target.id;
    const value = e.target.value;
    console.log("onFormChange. id: ", id, "current value: ", value);
    switch (id) {
      case 'tag1':
      case 'tag2':
      case 'tag3':
      case 'tag4':
        const newTags = { ...this.state.tags, [id]: value };
        this.setState({
          tags: newTags,
        });
        break;
      case 'category':
        this.setState({
          category: value,
        });
        break;
      case 'title':
        this.setState({
          title: value,
        });
    }
  }

  onContentChange(value) {
    console.log('onContentChange: ', value);
    this.setState({
      content: value,
    });
  }

  async createArticle() {
    // TODO:
    // ADD normalization on some fields and/or values
    // for example on permlink

    const wif = this.props.privateKey;
    const parentAuthor = '';
    const parentPermlink = this.state.category;
    const author = this.props.username;
    const title = this.state.title;
    const permlink = 'wiki' + '-' + title + '-'  + Date.now();

    const body = this.state.content.slice(0, 15);

    const tags = R.values(this.state.tags);
    const metadata = {
      tags: ['wiki', ...tags],
      article: this.state.content,
    };

    const jsonMetadata = JSON.stringify(metadata);

    try {
      console.log(
        "Creation article with: \n",
        "wif: ", wif,  "\n",
        "parentAuthor: ", parentAuthor,  "\n",
        "parentPermlink: ", parentPermlink,  "\n",
        "author: ", author, "\n",
        "permlink: ", permlink, "\n",
        "title: ", title, "\n",
        "body: ", body, "\n",
        "jsonMetadata: ", jsonMetadata, "\n",
      );

      const res = await makePostAsync(
        wif,
        parentAuthor,
        parentPermlink,
        author,
        permlink,
        title,
        body,
        jsonMetadata
      );

      console.log('Create article (result): ', res);

      // <Redirect to='/'/>

      const created = await golos.api.getContent(author, permlink);
      console.log('CREATED ARTICLE: ', created);
      this.props.readArticle(created);
      // <Redirect push to={`/articles/${permlink}`}/>
      this.props.history.push(`/articles/${permlink}`);
      ///

    } catch(err) {
      console.error("ERROR from CREATE ARTICLE: ", err);
    }

  }

  render() {
    return (
      <B.Container>

        <AvForm
          onChange={this.onFormChange}
        >
          <AvGroup row>
            <B.Col sm="1">
              <B.Label for="title" sm={2}>
                Title
              </B.Label>
            </B.Col>
            <B.Col sm="6">
              <AvGroup>
                <AvInput
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title for my article"
                  required
                />
                <AvFeedback>Should not be empty!</AvFeedback>
              </AvGroup>
            </B.Col>
          </AvGroup>

          <B.FormGroup row>
            <B.Col sm="1">
              <B.Label for="category" sm={2}>
                Category
              </B.Label>
            </B.Col>
            <B.Col sm="6">
              <AvGroup>
                <AvInput
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Category for my article"
                  required
                />
                <AvFeedback>Should not be empty!</AvFeedback>
              </AvGroup>
            </B.Col>
          </B.FormGroup>

          <div>
            <B.FormGroup row>
              <B.Col sm="1">
                <B.Label for="tag1" sm={2}>
                  Tags
                </B.Label>
              </B.Col>
              <B.Col sm="3">

                <AvGroup>
                  <AvInput
                    type="text"
                    name="tag1"
                    id="tag1"
                    placeholder="Tag #1"
                    required
                  />
                  <AvFeedback>Should not be empty!</AvFeedback>                  
                </AvGroup>

              </B.Col>
              <B.Col sm="3">
                <B.Input
                  type="text"
                  name="tag2"
                  id="tag2"
                  placeholder="Tag #2"
                />
              </B.Col>
            </B.FormGroup>
            <B.FormGroup
              row
            >
              <B.Col sm="1"></B.Col>
              <B.Col sm="3">
                <B.Input
                  type="text"
                  name="tag3"
                  id="tag3"
                  placeholder="Tag #3"
                />
              </B.Col>
              <B.Col sm="3">
                <B.Input
                  type="text"
                  name="tag4"
                  id="tag4"
                  placeholder="Tag #4"
                />
              </B.Col>
            </B.FormGroup>
          </div>

          <B.FormGroup row>
            <B.Col sm="1">
              <B.Label for="editor" sm={2}>
                Content
              </B.Label>
            </B.Col>
            <B.Col sm="11">
              <Editor
                id={"editor"}
                content={this.props.content || this.state.content}
                updateContent={this.onContentChange}
              />
            </B.Col>
          </B.FormGroup>

           <B.Row>
             <B.Button
               color="primary"
               onClick={ this.createArticle }
             >
              Create Article
            </B.Button>
          </B.Row>

        </AvForm>

      </B.Container>

    );
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const newContent = e.editor.getData();
    this.props.updateContent(newContent);
  }

  render() {
    return (
      <CKEditor
        activeClass="p10"
        content={this.props.content}
        events={{
          "change": this.onChange,
        }}
      />
    );
  }

}

export default CreateArticle;