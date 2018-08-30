import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { QuestionWrapper, PostSubtext } from '../CommonStyledComponents';


class QuestionInList extends Component {

    render() {
        return (
            <QuestionWrapper>
                <div className="voteCounter" >
                    <h3>{this.props.question.upvote}</h3>
                </div>

                <NavLink to={this.props.linkToQuestion} className="questionText">
                    <h2 style={{ marginBottom: 5 }}>{this.props.question.header}</h2>
                    <PostSubtext> By {this.props.question.firstName? this.props.question.firstName + " " +this.props.question.lastName: "Navn Navnesen"} 
                        {this.props.question.questionCreated ? "at " + this.props.question.questionCreated.substring(0, 10) : ""}
                        {" " + this.props.question.answerCount + " answers"}</PostSubtext>

                    <p>{this.props.question.body.length>500? 
                        this.props.question.body.substring(0,500)+"... Click to read more.":
                        this.props.question.body }</p>
                </NavLink>
            </QuestionWrapper>

        );
    }
}


export default connect()(QuestionInList);
