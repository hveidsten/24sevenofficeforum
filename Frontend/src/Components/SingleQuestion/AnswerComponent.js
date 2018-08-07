import React from 'react';
import {PostSubtext, QuestionWrapper} from '../CommonStyledComponents';
import QuestionVoteComponent from './QuestionVoteComponent';
import AddAnswerContainer from './AddAnswerContainer';

const AnswerComponent = ({answer, deleteAnswer,editAnswer, handleVote, user, categoryId, _showQuestionForm}) => {
   return(
   <div>
   <hr/>
   <QuestionVoteComponent 
            isLoggedIn = {user.isLoggedIn}
            votes = {answer.upvote}
            handleVote = {handleVote}
            id = {categoryId}
            />
   <p style={{overflowWrap: "break-word"}}>{answer.body}</p>
   <PostSubtext> Av Navn Navnesen  {answer.answerCreated? "den "+answer.answerCreated.substring(0,10):""}</PostSubtext>
   <br/>
   <a onClick={() => deleteAnswer(answer.id)}>fjern </a>
   <a onClick={() => _showQuestionForm(answer)}>endre </a>
  
   </div>
   );
};

export default AnswerComponent;