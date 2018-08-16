import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createAnswer, editAnswer } from '../../Actions/postActions';
import { AddAnswerModal } from './styledComponents';
import ModalBackground from './ModalBackground';
import { Button } from '../CommonStyledComponents';

class AddAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionBody: this.props.answer.id ? this.props.answer.body : "",
      showAnswerForm: false
    };

    this.handleChangeBody = this.handleChangeBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  _showAnswerForm = () => {
    this.setState({
      showAnswerForm: !this.state.showAnswerForm
    });
  }

  handleChangeBody(event) {
    this.setState({ questionBody: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const post = {
      body: this.state.questionBody,
      questionId: this.props.post.id,
      upvote: 0
    }
    if (this.props.answer.id) {
      post.id = this.props.answer.id;
      this.props.editAnswer(post);
    } else {
      this.props.createAnswer(post, "answers");
    }
    this.props.hideForm();
  }

  handleKeyPress(e){
    e.key==='Enter' &&
    this.handleSubmit(e);
  }

  render() {
    return (
      <Fragment>
        <ModalBackground onclick={this.props.hideForm} />
        <AddAnswerModal>
          <h3>{this.props.answer.id ? "Edit answers" : "New answer"}</h3>
          <form onSubmit={this.handleSubmit}>

            <textarea rows="20" cols="75" autoFocus 
            value={this.state.questionBody} 
            onChange={this.handleChangeBody}
            onKeyPress={this.handleKeyPress} 
             />

            <Button style={{ float: "right" }} color="#49bd39" onClick={this.handleSubmit}>
              {this.props.answer.id ? "Save changes" : "Post"}
            </Button>
            <Button style={{ float: "right" }} color="#f04b4b" onClick={this.props.hideForm}>Close</Button>

          </form>
        </AddAnswerModal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => (
  {
    post: state.posts.activeQuestion
  }
);


export default connect(mapStateToProps, { createAnswer, editAnswer })(AddAnswer);