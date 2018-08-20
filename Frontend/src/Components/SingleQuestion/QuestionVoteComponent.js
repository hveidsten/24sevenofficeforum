import React from 'react';

const QuestionVoteComponent = ({votes, handleVote, id, answer }) => {
   
    return (

        <div className="voteCounter" >
            {<h3 onClick={() => handleVote(1, id, answer)}>▲</h3>}

            <h3>{votes}</h3>

            {<h3 onClick={() => handleVote(0, id, answer)}>▼</h3>}
        </div>
    );
}

export default QuestionVoteComponent;