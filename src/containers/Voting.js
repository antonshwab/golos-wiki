import { connect } from 'react-redux';
import { Voting } from '../components/Voting';
import { voteUp, voteDown } from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const handleVoteUp = (dispatch) => async (author, permlink) => {
  await dispatch(voteUp(author, permlink));
};

const handleVoteDown = (dispatch) => async (author, permlink) => {
  await dispatch(voteDown(author, permlink));
};

const mapDispatchToProps = (dispatch) => {
  return {
    onVoteUp: handleVoteUp(dispatch),
    onVoteDown: handleVoteDown(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Voting);