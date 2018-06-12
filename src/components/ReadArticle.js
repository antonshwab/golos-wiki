import React from 'react';
import * as B from 'reactstrap';

export const ReadArticle = ({ currentVersion }) => {
  if (!currentVersion) {
    return (
      <h1>Not found!</h1>
    );
  }
  const { title, json_metadata } = currentVersion;
  const { articleContent } = JSON.parse(json_metadata);
  return (
    <B.Container>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{__html: articleContent}}/>
    </B.Container>
  );
};
 
