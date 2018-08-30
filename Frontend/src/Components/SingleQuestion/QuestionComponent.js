import React from 'react';
import Vote from '../CommonComponents/Vote';
import { QuestionWrapper, PostSubtext } from '../CommonStyledComponents';
import Button from '../CommonComponents/Button';


const QuestionComponent = ({ question, handleVote, categoryId, deleteQuestion, editPostRedirect }) => {
  return (
    <QuestionWrapper>
      <Vote
        isLoggedIn={true}
        votes={question.upvote}
        handleVote={handleVote}
        id={categoryId}
      />

      <div>
        <h2>{question.header}</h2>
        <PostSubtext> By {question.firstName? question.firstName + " " + question.lastName : "Navn Navnesen"} 
          {question.questionCreated ? " at " + question.questionCreated.substring(0, 10) : ""}
          {"  "+question.answerCount +"  answers"}</PostSubtext>

        <div>{question.body.split('\n').map((t,i) => <p key={i}>{t}</p>)}</div>

        <Button color="#f04b4b" onclick={deleteQuestion} text="Delete question"/>
        <Button onclick={editPostRedirect} color="#224477" text="Edit question"/>
      </div>

    </QuestionWrapper>);

}
export default QuestionComponent;