import React from 'react';
import {PostSubtext, AnswerWrapper} from '../CommonStyledComponents';
import QuestionVoteComponent from './QuestionVoteComponent';

const AnswerComponent = ({answer, deleteAnswer,editAnswer, handleVote, user, categoryId, toggleQuestionform}) => {
   return(
   <AnswerWrapper>
   <PostSubtext> Av Navn Navnesen  {answer.answerCreated? "den "+answer.answerCreated.substring(0,10):""}</PostSubtext>
  
   <QuestionVoteComponent 
            isLoggedIn = {user.isLoggedIn}
            votes = {answer.upvote}
            handleVote = {handleVote}
            id = {categoryId}
            answer = {answer}
            />
   <p>{answer.body}</p>
  
  
   <a style={{marginRight:"1rem"}} onClick={() => deleteAnswer(answer.id)}>fjern </a><br/>
   <a onClick={() => toggleQuestionform(answer)}>endre </a>
 
  </AnswerWrapper>
   );
};

export default AnswerComponent;