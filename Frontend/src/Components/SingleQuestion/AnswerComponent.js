import React from 'react';
import {PostSubtext} from '../CommonStyledComponents';

const AnswerComponent = ({answer, deleteAnswer,editAnswer}) => {
   return(
   <div>
   <hr/>
   <p style={{overflowWrap: "break-word"}}>{answer.body}</p>
   <PostSubtext> Av Navn Navnesen  {answer.answerCreated? "den "+answer.answerCreated.substring(0,10):""}</PostSubtext>
   <br/>
   <a onClick={() => deleteAnswer(answer.id)}>fjern </a>
   <a onClick={() => editAnswer(answer.id,"jeg er endret")}>endre </a>
  
   </div>
   );
};

export default AnswerComponent;