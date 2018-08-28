import React from 'react';
import { PostSubtext, AnswerWrapper } from '../CommonStyledComponents';
import Vote from '../CommonComponents/Vote';

const AnswerComponent = ({ answer, deleteAnswer, editAnswer, handleVote, user, categoryId, toggleQuestionform }) => {
    return (
        <AnswerWrapper>
            <PostSubtext> By Navn Navnesen  {answer.answerCreated ? "at " + answer.answerCreated.substring(0, 10) : ""}</PostSubtext>

            <Vote
                isLoggedIn={true}
                votes={answer.upvote}
                handleVote={handleVote}
                id={categoryId}
                answer={answer}
            />
            
            <p>{answer.body}</p>

            <a style={{ marginRight: "1rem" }} 
            onClick={() => window.confirm("Are you sure you want do delete this answer?")?
            deleteAnswer(answer.id):""}>Delete </a><br />
            <a onClick={() => toggleQuestionform(answer)}>Edit </a>

        </AnswerWrapper>
    );
};

export default AnswerComponent;