import React, { Component } from 'react';
import classnames from 'classnames';
import * as B from 'reactstrap';


export const ReadArticle = ({ article }) => {
  const {title, author, body, json_metadata} = article;  
  const { content } = JSON.parse(json_metadata);  
  return (
    <B.Container>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{__html: article}}/>
    </B.Container>
  );
};
 
