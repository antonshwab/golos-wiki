import React from 'react';
import * as B from 'reactstrap';
import * as R from 'ramda';
import { AddCommentWithToggler } from './AddCommentWithToggler';

const makeSubComment = (AddComment) => ({ title, content, author, permlink }) => {
  return (
    <B.Media>
      <B.Media left href="#">
        {author}          
      </B.Media>
      <B.Media body>
        <B.Media heading>
          {title} 
        </B.Media>
        FOR: {author}
        {content}
        <AddComment 
          parentAuthor={author}
          parentPermlink={permlink}
        />
      </B.Media>
    </B.Media>  
  );
};

const Comment = ({ title, content, author, permlink, subComments }) => {

  console.log('subComments: ', subComments);

  const flatSubComments = R.flatten(subComments);

  console.log('flatten subComments: ', flatSubComments); 

  const nestedComments = flatSubComments.map((comment, index) => {
    const { json_metadata, title, author, permlink } = comment;
    const { commentContent } = JSON.parse(json_metadata);
    const SubComment = makeSubComment(AddCommentWithToggler);
    return (<SubComment 
      key={index}
      title={title}
      content={commentContent}
      author={author}
      permlink={permlink}
    />);
  });

  return (
    <B.Container>
      <B.Media>
        <B.Media left href="#">
          {author}          
        </B.Media>
        <B.Media body>
          <B.Media heading>
            {title} 
          </B.Media>
          {content}

          { nestedComments }

        </B.Media>
      </B.Media>  
    </B.Container>
  );
};

export default ({ comments }) => {
  console.log('comments list: ', comments);
  const commentsList = comments.map(([comment, subComments], i) => {
    const { json_metadata, title, author, permlink } = comment;
    const { commentContent } = JSON.parse(json_metadata);

    return (<Comment
      key={i}
      title={title}
      content={commentContent}
      author={author}
      permlink={permlink}
      subComments={subComments}
    />);
  });

  return commentsList;
};
