import React from 'react';
import QuestionVoteComponent from './QuestionVoteComponent';
import { QuestionWrapper, PostSubtext, Button } from '../CommonStyledComponents';
import { withRouter } from 'react-router-dom';


const QuestionComponent = ({ question, handleVote, categoryId, deletePost, editPostRedirect }) => {
  return (
    <QuestionWrapper>
      <QuestionVoteComponent
        isLoggedIn={true}
        votes={question.upvote}
        handleVote={handleVote}
        id={categoryId}
      />

      <div>
        <h2>{question.header}</h2>
        <PostSubtext> By Navn Navnesen
          {question.questionCreated ? "at " + question.questionCreated.substring(0, 10) : ""}
          {"  "+question.answerCount +"  answers"}</PostSubtext>

        <p>{question.body}</p>

        <Button color="#f04b4b" onClick={deletePost}>Delete question</Button>
        <Button onClick={editPostRedirect} color="#224477">Edit question</Button>
      </div>

    </QuestionWrapper>);

}
export default QuestionComponent;
//export default withRouter(QuestionComponent);