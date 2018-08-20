import React from 'react';
import { PostSubtext, AnswerWrapper } from '../CommonStyledComponents';
import QuestionVoteComponent from './QuestionVoteComponent';

const AnswerComponent = ({ answer, deleteAnswer, editAnswer, handleVote, user, categoryId, toggleQuestionform }) => {
    return (
        <AnswerWrapper>
            <PostSubtext> By Navn Navnesen  {answer.answerCreated ? "at " + answer.answerCreated.substring(0, 10) : ""}</PostSubtext>

            <QuestionVoteComponent
                isLoggedIn={true}
                votes={answer.upvote}
                handleVote={handleVote}
                id={categoryId}
                answer={answer}
            />
            
            <p>{answer.body}</p>


            <a style={{ marginRight: "1rem" }} onClick={() => deleteAnswer(answer.id)}>Delete </a><br />
            <a onClick={() => toggleQuestionform(answer)}>Edit </a>

        </AnswerWrapper>
    );
};

export default AnswerComponent;