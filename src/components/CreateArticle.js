import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import CKEditor from "react-ckeditor-component";
import * as B from 'reactstrap';
import { Route, Switch, Link, NavLink, Redirect, withRouter } from 'react-router-dom';
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
import { articleMetaDataChange, articleContentChange } from '../actions';
import { Editor } from './Editor';

class CreateArticle extends React.Component {
  constructor(props) {
    super(props);

    this.onFormChange = this.onFormChange.bind(this);
    this.createArticle = this.createArticle.bind(this);
  }

  onFormChange(e) {
    const id = e.target.id;
    const value = e.target.value;
    switch (id) {
      case 'tag1':
      case 'tag2':
      case 'tag3':
      case 'tag4':
        const newTags = { ...this.props.tags, [id]: value };
        this.props.onArticleMetaDataChange('tags', newTags);
        break;
      case 'category':
      case 'title':
        this.props.onArticleMetaDataChange(id, value);
    }
  }

  async createArticle() {

    const parentAuthor = this.props.parentAuthor || '';
    const title = this.props.title;
    const parentPermlink = this.props.category;

    const titleInPermlink = title.toLowerCase().split(' ').join('-');
    const permlink = `${titleInPermlink}-${Date.now()}`;
    console.log('PERMLINK: ', permlink);
    const body = this.props.content.slice(0, 15);
    const tags = R.values(this.props.tags);
    const metadata = {
      tags: ['wiki', ...tags],
      articleContent: this.props.content,
    };
    const jsonMetadata = JSON.stringify(metadata);

    this.props.submitArticle({
      parentAuthor,
      parentPermlink,
      permlink,
      title,
      body,
      jsonMetadata
    });

    // this.props.history.push(`/articles/${permlink}`);
    
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
                content={ this.props.content }
                updateContent={ this.props.onArticleContentChange }
              />
            </B.Col>
          </B.FormGroup>

           <B.Row>
             <B.Button
               color="primary"
               onClick={ this.createArticle }
             >
              { this.props.buttonText }
            </B.Button>
          </B.Row>

        </AvForm>

      </B.Container>

    );
  }
}


CreateArticle.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  tags: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,

  onArticleMetaDataChange: PropTypes.func.isRequired,
  onArticleContentChange: PropTypes.func.isRequired,
  submitArticle: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  const { title, category, tags, content } = state.articleCreation;
  const { buttonText } = ownProps;
  return {
    title,
    category,
    tags,
    content,
    buttonText,
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  const { submitArticle } = ownProps ;
  return {
    onArticleMetaDataChange: (fieldId, data) => dispatch(articleMetaDataChange(fieldId, data)),
    onArticleContentChange: (content) => dispatch(articleContentChange(content)),
    submitArticle,
  };
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateArticle));





