import React from 'react';
import * as B from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

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

const renderTextAreaField = ({
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
          type="textarea"
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

const CreateComment = (props) => {
  const { handleSubmit, pristine, reset, submitting, isShow } = props;

  if (!isShow) {
    return null;
  }

  return (
    <B.Form onSubmit={handleSubmit}>
      <B.Container>
        <Field
          name='title'
          label='Title'
          id='title'
          placeholder='Title'
          component={renderTextField}
        />
      </B.Container>

      <B.Container>
        <Field
          name='content'
          label='Comment'
          id='content'
          placeholder='Write comment'
          component={renderTextAreaField}
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
              Clear
            </B.Button>
          </B.Col>
        </B.Row>
      </B.Container>
    </B.Form>
  );
};

const validate = (values) => {
  const errors = {};
  if (!values.comment) {
    errors.comment = 'Required';
  }
  if (!values.title) {
    errors.title = 'Required';
  }
  return errors;
};

// export const CreateRootCommentComponent = reduxForm({
//   form: 'createRootComment',
//   validate
// })(CreateComment);

// export const CreateSubCommentComponent = reduxForm({
//   form: 'createSubComment',
//   enableReinitialize: true,
//   validate
// })(CreateComment);

export default reduxForm({
  form: 'createComment',
  enableReinitialize: true,
  validate
})(CreateComment);