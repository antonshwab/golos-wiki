import { connect } from 'react-redux';

import { makeCommentPermlinkFromTitle, prepareTagsForComment } from '../utils';
import CreateComment from '../components/CreateComment';
import { submitComment } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const { parentAuthor, parentPermlink, isShow } = ownProps;

  const initialValues = {
    parentAuthor,
    parentPermlink,
    isShow
  };

  console.log('Initials values: ', initialValues);

  return {
    initialValues,
  };
};

const handleSubmit = (dispatch) => async (values) => {
  const { parentAuthor, parentPermlink, title, content } = values;

  const permlink = makeCommentPermlinkFromTitle(title);
  const body = content.slice(0, 15);
  const preparedTags = prepareTagsForComment();

  const metadata = {
    tags: preparedTags,
    commentContent: content,
  };
  const jsonMetadata = JSON.stringify(metadata);

  await dispatch(submitComment({
    parentAuthor,
    parentPermlink,
    permlink,
    title,
    body,
    jsonMetadata,
  }));
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: handleSubmit(dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateComment);