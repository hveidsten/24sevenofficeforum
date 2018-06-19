import React from 'react';


export const questionComponent = ({}) => {
 <div> 
            <div className="questionContainer">

            {isLoggedIn &&  
            (<div className="voteCounter" >
            <h3 onClick={(e) => this.handleVote(e,1,this.props.match.params.questionid)}>▲</h3>
            <h3>{this.props.post.upvote}</h3>
            <h3 onClick={(e) => this.handleVote(e,0, this.props.match.params.questionid)}>▼</h3>
            </div>)}

           <div className="questionText">
            <h2>{this.props.post.header}</h2>
            <p>{this.props.post.body}</p>
          
          
           </div>
           
         </div>

          {this.props.post.answer.map((a, key) => <div key={key}><hr/><a onClick={() => this.props.deleteAnswer(a.id)} >fjern</a> {a.body}</div>)}

          <br/>

           {this.props.user.isLoggedIn? <div> <Button primary onClick={this._showQuestionForm.bind()}>Nytt svar</Button>
            <Button className="addPostButton" style={{background:"red"}}onClick={ (e) => {if(window.confirm("Sikker?")) {this.deletePost(e)}}}>Fjern spørsmål</Button></div>:""}

                  { this.state.showQuestionForm && (<AddAnswerContainer hideForm={this._showQuestionForm} />) }

                  
            </div>
}