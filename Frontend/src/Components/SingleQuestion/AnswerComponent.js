import React from 'react';

const AnswerComponent = ({answer, deleteAnswer}) => {
   return(
   <div>
   <p>{answer.body}</p>
   <a onClick={() => deleteAnswer(answer.id)}>fjern </a>
   <hr/>
   </div>
   );
};

export default AnswerComponent;