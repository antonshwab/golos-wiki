import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    // this.updateContent = this.updateContent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      content: 'content',
    }
  }

  updateContent(newContent) {
    this.setState({
      content: newContent,
    })
  }

  onChange(e) {
    console.log("onChange fired with event info: ", e);
    const newContent = e.editor.getData();
    this.updateContent(newContent);
  }

  onBlur(e){
    console.log("onBlur event called with event info:  ", e);

  }
  
  afterPaste(e){
    console.log("afterPaste event called with event info: ", e);
  }

  render() {
    return (
      <CKEditor
        activeClass="p10"
        content={this.state.content}
        events={{
          "blur": this.onBlur,
          "afterPaste": this.afterPaste,
          "change": this.onChange,
        }}
      />
    );
  }

}


export default Editor;