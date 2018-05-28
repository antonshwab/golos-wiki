import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as B from 'reactstrap';
import { editingArticle } from '../actions';

export class Editor extends React.Component {
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

Editor.propTypes = {
  content: PropTypes.string.isRequired,
  updateContent: PropTypes.func.isRequired,
}

export default Editor;
