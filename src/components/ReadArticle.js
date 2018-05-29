import React, { Component } from 'react';
import classnames from 'classnames';
import * as B from 'reactstrap';


export const ReadArticle = ({ currentVersion }) => {
  const { title, author, json_metadata } = currentVersion;
  console.log('json_metadata: ', json_metadata);
  const { articleContent } = JSON.parse(json_metadata);
  return (
    <B.Container>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{__html: articleContent}}/>
    </B.Container>
  );
};
 
