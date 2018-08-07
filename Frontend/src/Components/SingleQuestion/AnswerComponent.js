import React from 'react';
import {PostSubtext, AnswerWrapper} from '../CommonStyledComponents';
import QuestionVoteComponent from './QuestionVoteComponent';
import AddAnswerContainer from './AddAnswerContainer';

const AnswerComponent = ({answer, deleteAnswer,editAnswer, handleVote, user, categoryId, _showQuestionForm}) => {
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
   <a onClick={() => _showQuestionForm(answer)}>endre </a>
 
  </AnswerWrapper>
   );
};

export default AnswerComponent;