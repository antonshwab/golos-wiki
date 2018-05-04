import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
import * as B from 'reactstrap';
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
    // ADD normalization on some fields

    const wif = this.props.privateKey;
    const parentAuthor = '';
    const parentPermlink = this.state.category;
    const author = this.props.username;
    const title = this.state.title;
    const permlink = 'wiki' + '-' + parentPermlink + '-' + title + '-'  + Date.now();
    const body = this.state.content;
    const tags = R.values(this.state.tags);
    const metadata = {
      tags: ['wiki', ...tags],
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

    } catch(err) {
      console.error("ERROR from CREATE ARTICLE: ", err);
    }

  }

  render() {
    return (
      <B.Container>
        <B.Form
          onChange={this.onFormChange}
        >
          <B.FormGroup row>
            <B.Col sm="1">
              <B.Label for="title" sm={2}>
                Title
              </B.Label>
            </B.Col>  
            <B.Col sm="6">
              <B.InputGroup>
                <B.Input 
                  type="text" 
                  name="title"
                  id="title"
                  placeholder="Title for my article"
                />
                <B.InputGroupAddon addonType="append">by {this.props.username}</B.InputGroupAddon>
              </B.InputGroup>
            </B.Col>
          </B.FormGroup>

          <B.FormGroup row>
            <B.Col sm="1">
              <B.Label for="title" sm={2}>
                Category
              </B.Label>
            </B.Col>  
            <B.Col sm="6">
              <B.Input 
                type="text" 
                name="category"
                id="category"
                placeholder="Category for my article"
              />
            </B.Col>
          </B.FormGroup>

          <div>
            <B.FormGroup row>
              <B.Col sm="1">
                <B.Label for="title" sm={2}>
                  Tags
                </B.Label>
              </B.Col>  
              <B.Col sm="3">
                <B.Input 
                  type="text" 
                  name="tag1"
                  id="tag1"
                  placeholder="Tag #1"
                />
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
              <B.Label for="title" sm={2}>
                Content
              </B.Label>
            </B.Col>  
            <B.Col sm="11">
              <Editor 
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

        </B.Form>

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