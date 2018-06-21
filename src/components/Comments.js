import React from 'react';
import * as B from 'reactstrap';

export default ({ comments }) => {
  console.log('comments list: ', comments);
  const commentsList = comments.map(([comment, subComments], i) => {
    const { json_metadata, title } = comment;
    console.log('json_metadata', json_metadata);
    const { commentContent } = JSON.parse(json_metadata);

    return (
      <B.Media key={i}>
        <B.Media body>
          <B.Media heading>
            {title}
          </B.Media>
          {commentContent}
        </B.Media>
      </B.Media>
    );
  });

  return commentsList;
};
