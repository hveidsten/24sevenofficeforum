import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { QuestionWrapper, PostSubtext } from '../CommonStyledComponents';


class QuestionInList extends Component {

    render() {
        console.log(this.props.question.answerCount)
        return (
            <QuestionWrapper>
                <div className="voteCounter" >
                    <h3>{this.props.question.upvote}</h3>
                </div>

                <NavLink to={this.props.linkToQuestion} className="questionText">
                    <h2 style={{ marginBottom: 5 }}>{this.props.question.header}</h2>
                    <PostSubtext> By Navn Navnesen  {this.props.question.questionCreated ? "at " + this.props.question.questionCreated.substring(0, 10) : ""}
                        {" " + this.props.question.answerCount + " answers"}</PostSubtext>
                    <p>{this.props.question.body}</p>
                </NavLink>

            </QuestionWrapper>

        );
    }
}

const mapStateToProps = (state) => ({
    post: state.posts.allQuestionsInCategory
});

export default connect(mapStateToProps)(QuestionInList);
