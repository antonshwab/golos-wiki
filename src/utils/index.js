import * as R from 'ramda';

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export const makePermlinkFromTitle = (title) => {
  const joined = title.toLowerCase().split(' ').join('-');
  const withTimestamp = `${joined}-${Date.now()}`;
  return withTimestamp;
};

export const prepareTags = (tags) => {
  const devTag = 'wikidev3';
  const prepared = tags
    .split(' ')
    .filter((el) => el !== '' && el !== ' ');
  const normalized = R.uniq([devTag, ...prepared]);
  return normalized;
};
