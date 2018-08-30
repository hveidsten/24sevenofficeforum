import React from 'react';
import { PostSubtext, AnswerWrapper } from '../CommonStyledComponents';
import Vote from '../CommonComponents/Vote';
import { withRouter } from 'react-router-dom';

const AnswerComponent = ({ answer, deleteAnswer, handleVote, categoryId, toggleQuestionform, historyPush, user }) => {
    return (
        <AnswerWrapper>
            <PostSubtext> <p onClick={() => historyPush("../../user/" + answer.userId)}>By {answer.firstName ? answer.firstName + " " + answer.lastName : "Navn Navnesen"} </p>  {answer.answerCreated && "at " + answer.answerCreated.substring(0, 10)}</PostSubtext>

            <Vote
                isLoggedIn={true}
                votes={answer.upvote}
                handleVote={handleVote}
                id={categoryId}
                answer={answer}
            />

            <div style={{ width: "100%" }}>{answer.body.split('\n').map((t, i) => <p key={i}>{t}</p>)}</div>
            {user && user.id === answer.userId ?
                (<div>< a style={{ marginRight: "1rem" }}
            onClick={() => window.confirm("Are you sure you want do delete this answer?") ?
                deleteAnswer(answer.id) : ""}>Delete </a> <br />
        <a onClick={() => toggleQuestionform(answer)}>Edit </a> </div>):""
        }

        </AnswerWrapper >
    );
};

export default withRouter(AnswerComponent);