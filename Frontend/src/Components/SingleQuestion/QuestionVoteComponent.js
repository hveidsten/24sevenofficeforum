import React from 'react';

 const QuestionVoteComponent = ({isLoggedIn, votes,handleVote, id, answer}) => {
    return(

           <div className="voteCounter" >
           {isLoggedIn && (
            <h3 onClick={() => handleVote(1,id, answer)}>▲</h3>)}

            <h3>{votes}</h3>

             {isLoggedIn && (
            <h3 onClick={() => handleVote(0,id, answer)}>▼</h3>)}
            </div>
    );
}

export default QuestionVoteComponent;