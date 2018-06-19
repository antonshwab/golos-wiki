import { connect } from 'react-redux';
import CreateComment from '../components/CreateComment';
import { makeCommentPermlinkFromTitle, prepareTagsForComment } from '../utils';

const mapStateToProps = (state, ownProps) => {
  const { baseOnVersion } = ownProps;
  const { parent_author, parent_permlink, title, category, json_metadata, } = baseOnVersion;

  const initialValues = {
    parentAuthor: parent_author,
    parentPermlink: parent_permlink,
  };

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

  await dispatch(submitArticleVersion({
    parentAuthor,
    parentPermlink,
    permlink,
    title,
    body,
    jsonMetadata,
  }));

  // const versionPermlink = permlink;
  // await dispatch(push(`${versionPermlink}`));
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