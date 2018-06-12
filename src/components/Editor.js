import React from 'react';
import CKEditor from "react-ckeditor-component";
import PropTypes from 'prop-types';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    const newValue = evt.editor.getData();
    this.props.onChange(newValue);
  }

  render() {
    return (
      <CKEditor
        activeClass="p10"
        content={this.props.value}
        events={{
          "change": this.onChange,
        }}
      />
    );
  }
}

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Editor;
