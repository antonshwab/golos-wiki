import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { submitNewArticle } from '../actions';

import { makePermlinkFromTitle, prepareTags } from '../utils';
import { CreateFstArticleVersionComponent } from '../components/CreateArticleVersion';




const handleSubmit = (dispatch) => async (values) => {

  const { category, title, tags, content } = values;

  const parentAuthor = '';
  const parentPermlink = category;
  const permlink = makePermlinkFromTitle(title);

  const body = content.slice(0, 15);
  const preparedTags = prepareTags(tags);

  const metadata = {
    tags: preparedTags,
    articleContent: content,
  };
  const jsonMetadata = JSON.stringify(metadata);

  await dispatch(submitNewArticle({
    parentAuthor,
    parentPermlink,
    permlink,
    title,
    body,
    jsonMetadata,
  }));

  const originPermlink = `0-${permlink}`;
  const versionPermlink = permlink;
  await dispatch(push(`${originPermlink}/${versionPermlink}`));
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: handleSubmit(dispatch),
    isReadonly: () => null,
  };
};

export default connect(
  () => {},
  mapDispatchToProps
)(CreateFstArticleVersionComponent);