import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createPost, editPost } from '../../Actions/postActions';
import { Redirect } from 'react-router';
import { NewQuestionComponent } from './NewQuestionComponent';

class NewQuestion extends Component {

  constructor(props) {
    super(props);
    const edit = this.props.match.path === "/edit_question" && this.props.post;
    this.state = {
      questionHeading: edit ? this.props.post.header : "",
      questionBody: edit ? this.props.post.body : "",
      categoryId: edit ? this.props.post.categoryId : "none"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    this.setState({ [event.target.name]: event.target.value });

  }

  handleSubmit(event) {
    event.preventDefault();

    const post = {
      header: this.state.questionHeading,
      body: this.state.questionBody,
      categoryId: this.state.categoryId
    }
    if (this.props.match.path === "/edit_question" && this.props.post && post.categoryId !== "none") {
      post.id = this.props.post.id;
      post.upvote = this.props.post.upvote;
      this.props.editPost(post);
    } else if (post.categoryId === "none") {
      alert("Select category");

    } else {
      post.upvote = 0;
      this.props.createPost(post);
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
            edit={this.props.match.path === "/edit_question" && this.props.post}
          />

          {this.props.post && this.props.post.hasBeenPosted &&
            <Redirect to={this.props.categories.find(c => c.id === this.props.post.categoryId).categoryName.replace(' ', '_') + "/" + this.props.post.id} />}

        </div>

      )
    } else { return (<h2>vent</h2>) }
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    createPost: (post, path) => dispatch(createPost(post, path)),
    editPost: (post) => dispatch(editPost(post))
  };
};

const mapStateToProps = state => (
  {
    post: state.posts.activeQuestion,
    categories: state.category.allCategories,
    activeCategory: state.category.currentCategory
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);