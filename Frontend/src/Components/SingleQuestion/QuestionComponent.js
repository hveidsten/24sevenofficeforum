import React from 'react';
import QuestionVoteComponent from './QuestionVoteComponent';
import {QuestionWrapper, PostSubtext} from '../CommonStyledComponents';


 const QuestionComponent = ({user, question,handleVote, categoryId}) => {
     return(
            <QuestionWrapper>
            <QuestionVoteComponent 
            isLoggedIn = {user.isLoggedIn}
            votes = {question.upvote}
            handleVote = {handleVote}
            id = {categoryId}
            />
           
           <div>
            <h2>{question.header}</h2>
            <PostSubtext> Av Navn Navnesen  {question.questionCreated? "den "+question.questionCreated.substring(0,10):""} {question.answer.length} svar</PostSubtext>
            <p>{question.body}</p>
           </div>
           
         </QuestionWrapper>);


      
}
export default QuestionComponent;