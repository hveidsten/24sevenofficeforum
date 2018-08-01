import React from 'react';

const AnswerComponent = ({answer, deleteAnswer,editAnswer}) => {
   return(
   <div>
   <p>{answer.body}</p>
   <a onClick={() => deleteAnswer(answer.id)}>fjern </a>
   <a onClick={() => editAnswer(answer.id,"jeg er endret")}>endre </a>
   <hr/>
   </div>
   );
};

export default AnswerComponent;