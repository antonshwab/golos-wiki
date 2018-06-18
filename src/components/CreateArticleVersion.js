import React from 'react';
import * as B from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import Editor from './Editor';

export const renderTextField = ({
  input,
  name,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <B.FormGroup row>
      <B.Col sm="1">
        <B.Label for={custom.id} sm={2}>
          {label}
        </B.Label>
      </B.Col>
      <B.Col sm="6">
        <B.Input
          type="text"
          {...input}
          {...custom}
          invalid={touched && !!error}
          valid={touched && !error}
        />
        <B.FormText>{custom.helpText}</B.FormText>
        <B.FormFeedback>{error}</B.FormFeedback>
      </B.Col>
    </B.FormGroup>
  );
};

export const renderEditor = ({
  input,
  name,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <B.FormGroup row>
      <B.Col sm="1">
        <B.Label for={name} sm={2}>
          {label}
        </B.Label>
      </B.Col>
      <B.Col sm="11">
        <Editor {...input} />
      </B.Col>
    </B.FormGroup>
  );
};


export const CreateArticleVersion = (props) => {
  const { handleSubmit, pristine, reset, submitting, isReadonly } = props;
  return (
    <B.Form onSubmit={handleSubmit}>
      <B.Container>
        <Field
          name='title'
          label='Title'
          id='title'
          placeholder='Title'
          component={renderTextField}
          readonly={isReadonly('title')}
        />
      </B.Container>

      <B.Container>
        <Field
          name='category'
          label='Category'
          id='category'
          placeholder='category'
          component={renderTextField}
          normalize={ lower }
          readonly={isReadonly('category')}
        />
      </B.Container>

      <B.Container>
        <Field
          name='tags'
          label='Tags'
          id='tags'
          placeholder='tags'
          helpText='Enter no more than 4 tags separated by a space'
          component={renderTextField}
          readonly={isReadonly('tags')}
        />
      </B.Container>

      <B.Container>
        <Field
          name='content'
          label='Editor'
          component={renderEditor}
        />
      </B.Container>

      <B.Container>
        <B.Row>
          <B.Col sm='1'>
          </B.Col>
          <B.Col sm='1'>
            <B.Button
              type='submit'
              color="primary"
              size="sm"
              disabled={ pristine || submitting }
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </B.Button>
          </B.Col>
          <B.Col sm='1'>
            <B.Button
              type='button'
              color="secondary"
              size="sm"
              disabled={ pristine || submitting }
              onClick={reset}
            >
              Clear Form
            </B.Button>
          </B.Col>
        </B.Row>
      </B.Container>

    </B.Form>
  );
};

const lower = (value) => value && value.toLowerCase();

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'title',
    'category',
    'tags',
    'content'
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  
  const tags = values.tags ? values.tags.split(' ').filter((el) => el !== '' && el !== ' ') : [];
  if (tags && tags.length > 4) {
    errors.tags = 'No more than 4 tags';
  }
  return errors;
};

export const CreateFstArticleVersionComponent = reduxForm({
  form: 'createFstArticleVersion',
  validate
})(CreateArticleVersion);

export const CreateNextArticleVersionComponent = reduxForm({
  form: 'createNextArticleVersion',
  enableReinitialize: true,
  validate
})(CreateArticleVersion);