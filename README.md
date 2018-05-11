# Golos-Wiki

> https://antonshwab.github.io/golos-wiki/


Current problem:
  click on read (Card Article) fails with TypeError: _props$rawArticle2 is undefined
      Add propTypes  

TODO:

-- 1. лейблы подправить на форме добавляения
-- 2. в json_metadata ложишь саму статью, а в боди берёшь один абзац
-- 3. валидацию прмитивную (required атрибут у инпутов)
4. роутинг (хеш)
5. ридерект на новую статью после добавления или показать ошибки
6. Валидация/обратная связь в добавлении/редактировании статьи


Routes for articles:

ARTICLE_NAME = Lambda
VERSION = Lambda(SOME_HASH)

/articles/:ARTICLE_NAME
/articles/:ARTICLE_NAME/edit
/articles/:ARTICLE_NAME/discussions
/articles/:ARTICLE_NAME/versions 

/articles/:ARTICLE_NAME/versions/:VERSION
/articles/:ARTICLE_NAME/versions/:VERSION/discussions
/articles/:ARTICLE_NAME/versions/diff/? v1=:VERSION1 && v2=:VERSION2



