import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createQuestion, editQuestion } from '../../Actions/questionActions';
import { Redirect } from 'react-router';
import { NewQuestionComponent } from './NewQuestionComponent';

class NewQuestion extends Component {

  constructor(props) {
    super(props);
    const edit = this.props.match.path === "/edit_question" && this.props.question;
    this.state = {
      questionHeading: edit ? this.props.question.header : "",
      questionBody: edit ? this.props.question.body : "",
      categoryId: edit ? this.props.question.categoryId : "none"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    this.setState({ [event.target.name]: event.target.value });

  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.questionHeading === "") {
      alert("Please type in your question before submitting.");
    } else {
      const post = {
        header: this.state.questionHeading,
        body: this.state.questionBody,
        categoryId: this.state.categoryId
      }
      if (this.props.match.path === "/edit_question" && this.props.question && post.categoryId !== "none") {
        post.id = this.props.question.id;
        post.upvote = this.props.question.upvote;
        this.props.editQuestion(post);
      } else if (post.categoryId === "none") {
        alert("Select category");

      } else {
        post.upvote = 0;
        this.props.createQuestion(post);
      }
    }
  }

  render() {
    if (this.props.categories) {
      return (
        <div className="newQuestionForm">
          <NewQuestionComponent
            handleSubmit={this.handleSubmit}
            questionHeading={this.state.questionHeading}
            handleChange={this.handleChange}
            questionBody={this.state.questionBody}
            categories={this.props.categories}
            categoryId={this.state.categoryId}
            edit={this.props.match.path === "/edit_question" && this.props.question}
          />

          {this.props.question && this.props.question.hasBeenPosted &&
            <Redirect to={this.props.categories.find(c => c.id === this.props.question.categoryId).categoryName.replace(' ', '_') + "/" + this.props.question.id} />}

        </div>

      )
    } else { return (<h2>vent</h2>) }
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    createQuestion: (post) => dispatch(createQuestion(post)),
    editQuestion: (post) => dispatch(editQuestion(post))
  };
};

const mapStateToProps = state => (
  {
    question: state.questions.activeQuestion,
    categories: state.category.allCategories,
    activeCategory: state.category.currentCategory
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);