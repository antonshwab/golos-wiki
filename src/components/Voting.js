import React from 'react';
import * as B from 'reactstrap';
import PropTypes from 'prop-types';

export const Voting = (props) => {
  const { onVoteUp, onVoteDown, author, permlink, votesCount } = props;
  const handleVoteUp = () => onVoteUp(author, permlink);
  const handleVoteDown = () => onVoteDown(author, permlink);
  return (
    <B.Container>
      <B.Badge color="primary" pill>{votesCount}</B.Badge>
      <B.Button onClick={handleVoteUp}>
        Up
      </B.Button>
      { }
      <B.Button onClick={handleVoteDown}>
        Down
      </B.Button>    
    </B.Container>
  );
};