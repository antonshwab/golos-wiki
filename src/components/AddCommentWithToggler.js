import React from 'react';
import * as B from 'reactstrap';
import CreateComment from '../containers/CreateComment';

export class AddCommentWithToggler extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAddingComment = this.toggleAddingComment.bind(this);
    this.state = {
      showAddingComment: false,
    };
  }

  toggleAddingComment() {
    this.setState({
      showAddingComment: !this.state.showAddingComment,
    });
  }

  render() {
    console.log('props in AddCommentWithToggler: ', this.props);
    return (
      <B.Container>
        <B.Button
          color="info"
          size='sm'
          onClick={this.toggleAddingComment}
        >
          {!this.state.showAddingComment ? 'Add Comment' : `Don't add`}
        </B.Button>

        <CreateComment
          parentAuthor={this.props.parentAuthor}
          parentPermlink={this.props.parentPermlink}
          isShow={ this.state.showAddingComment }
        />
      </B.Container>
    );
  }
}