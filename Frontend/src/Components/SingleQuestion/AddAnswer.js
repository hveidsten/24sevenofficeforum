import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { AddAnswerModal } from './styledComponents';
import ModalBackground from './ModalBackground';
import { Button } from '../CommonComponents/Button';
import { createAnswer, editAnswer } from '../../Actions/answerActions';

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
    if (this.state.questionBody === "") {
      alert("Please type in your answer to submit.")
    } else {
      const post = {
        body: this.state.questionBody,
        questionId: this.props.question.id,
        upvote: 0
      }

      if (this.props.answer.id) {
        post.id = this.props.answer.id;
        this.props.editAnswer(post);
      } else {
        this.props.createAnswer(post, this.props.user);
      }
      this.props.hideForm();
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) { this.handleSubmit(e); }

  }

  render() {
    return (
      <Fragment>
        <ModalBackground onclick={this.props.hideForm} />
        <AddAnswerModal>

          <h3>{this.props.answer.id ? "Edit answer" : "New answer"}</h3>
          <div style={{ margin: "1em" }}>
            <Button color="#49bd39" onclick={this.handleSubmit}
              text={this.props.answer.id ? "Save changes" : "Submit"} />
            <Button color="#f04b4b" onclick={this.props.hideForm} text="Close" />
          </div>
          <form onSubmit={this.handleSubmit}>

            <textarea rows="20" cols="75" autoFocus
              placeholder="Type here"
              value={this.state.questionBody}
              onChange={this.handleChangeBody}
              onKeyPress={this.handleKeyPress}
            />

          </form>
        </AddAnswerModal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => (
  {
    question: state.questions.activeQuestion,
    user: state.user.loggedInUser
  }
);


export default connect(mapStateToProps, { createAnswer, editAnswer })(AddAnswer);
