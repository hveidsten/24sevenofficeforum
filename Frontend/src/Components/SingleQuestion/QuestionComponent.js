import React from 'react';
import QuestionVoteComponent from './QuestionVoteComponent';
import {QuestionWrapper, PostSubtext, Button} from '../CommonStyledComponents';


 const QuestionComponent = ({user, question,handleVote, categoryId, deletePost}) => {
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
            <Button color="red"
            onClick={ (e) => {if(window.confirm("Sikker på at du vil fjerne spørsmålet?")) {deletePost(e)}}}>Fjern spørsmål</Button>
            <Button  color="blue">Endre spørsmål</Button>
           </div>
           
         </QuestionWrapper>);


      
}
export default QuestionComponent;