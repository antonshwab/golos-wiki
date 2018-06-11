import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { submitNewArticle } from '../actions';
import * as R from 'ramda';

import { CreateFstArticleVersionComponent } from '../components/CreateArticleVersion';


const makePermlinkFromTitle = (title) => {
  const joined = title.toLowerCase().split(' ').join('-');
  const withTimestamp = `${joined}-${Date.now()}`;
  return withTimestamp;
};

const prepareTags = (tags) => {
  const devTag = 'wikidev3';
  const prepared = tags
    .split(' ')
    .filter((el) => el !== '' && el !== ' ');
  const normalized = R.uniq([devTag, ...prepared]);
  return normalized;
};

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