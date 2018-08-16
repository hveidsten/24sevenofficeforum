import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { QuestionWrapper, PostSubtext } from '../CommonStyledComponents';


class QuestionInList extends React.Component {

    render() {
        return (
            <QuestionWrapper>
                <div className="voteCounter" >
                    <h3>{this.props.question.upvote}</h3>
                </div>

                <NavLink to={this.props.linkToQuestion} className="questionText">
                    <h2 style={{ marginBottom: 5 }}>{this.props.question.header}</h2>
                    <PostSubtext> By Navn Navnesen  {this.props.question.questionCreated ? "at " + this.props.question.questionCreated.substring(0, 10) : ""} {this.props.question.answer.length} answers</PostSubtext>
                    <p>{this.props.question.body}</p>
                </NavLink>

            </QuestionWrapper>

        );
    }
}

const mapStateToProps = (state) => ({
    post: state.posts.allQuestionsInCategory[0]
});

export default connect(mapStateToProps)(QuestionInList);
