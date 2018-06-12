import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { submitArticleVersion } from '../actions';
import * as R from 'ramda';

import { CreateNextArticleVersionComponent } from '../components/CreateArticleVersion';

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
  console.log('values in handle submit from next version:', values);

  const { parentAuthor, parentPermlink, title, tags, content } = values;

  const permlink = makePermlinkFromTitle(title);
  const body = content.slice(0, 15);
  const preparedTags = prepareTags(tags);

  const metadata = {
    tags: preparedTags,
    articleContent: content,
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

  const versionPermlink = permlink;
  await dispatch(push(`${versionPermlink}`));
};

const mapStateToProps = (state, ownProps) => {
  const { baseOnVersion } = ownProps;
  console.log(baseOnVersion);
  const { parent_author, parent_permlink, title, category, json_metadata, } = baseOnVersion;
  const { tags, articleContent } = JSON.parse(json_metadata);

  const initialValues = {
    parentAuthor: parent_author,
    parentPermlink: parent_permlink,
    title,
    category,
    tags: tags.join(' '),
    content: articleContent,
  };

  return {
    pathname: state.router.location.pathname,
    search: state.router.location.search,
    hash: state.router.location.hash,
    initialValues,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: handleSubmit(dispatch),
    isReadonly: (name) => {
      if (R.contains(name, ['title', 'category', 'tags'])) {
        return 'readonly'
      } else {
        return null;
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNextArticleVersionComponent);