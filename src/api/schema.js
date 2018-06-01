import { normalize, schema } from 'normalizr';

const versionSchema = new schema.Entity('versions', {}, {
  idAttribute: v => v.permlink,
});

const articleSchema = new schema.Entity('origins', {
  versions: [ versionSchema ],
}, {
  idAttribute: a => a.permlink,
});

export const articlesSchema = [ articleSchema ];


