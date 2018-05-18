import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost} from '../Actions/postActions';

import {editPost} from '../Actions/postActions'
import NewQuestion from './NewQuestion';

class QuestionContainer extends Component{

    
    constructor() {
        super(); 
        this.state = { showQuestionForm: false }
        
      }

      _showQuestionForm = () => {
        this.setState({
            showQuestionForm: !this.state.showQuestionForm
        });
      }
   
    componentDidMount(){
        console.log(this.props);
        this.props.fetchPost(this.props.match.params.questionid);
    }

componentDidUpdate(){
    console.log("Oppdaterte!");
}

 handleVote(e,up){
     let vote = this.props.post;
     if(up==1){vote.upvote++;}
     else if(up==0){vote.upvote--;}
     this.props.editPost(vote);
     this.forceUpdate();
 }   
 
 

    render() { 
        console.log(this);
        if(this.props.post == undefined){ return <h2>Vent</h2>;}
        else{
          
        return(
              <div> 
            <div className="questionContainer">
            <div className="voteCounter" >
            <h3 onClick={(e) => this.handleVote(e,1,this.props.match.params.questionid)}>▲</h3>
            <h3>{this.props.post.upvote}</h3>
            <h3 onClick={(e) => this.handleVote(e,0, this.props.match.params.questionid)}>▼</h3>
            </div>

           <div  className="questionText">
            <h2>{this.props.post.header}</h2>
            <p>{this.props.post.body}</p>
            {this.props.post.answer.map((a, key) => <div key={key}>{a.body}</div>)}
          
           </div>
           
         </div>
            <span className="addPostButton" onClick={this._showQuestionForm.bind()}>Nytt svar</span>
                    { this.state.showQuestionForm && (<NewQuestion  />) }
            </div>
                
              );
          }   
        }     
}
/* <h2>{this.props.post.data.header}</h2>
                   <p>{this.props.post.data.body}</p>
                   {this.props.post.data.answer.map((a, key) => <div key={key}>{a.body}</div>)}*/ 

const mapStateToProps = state => (
    {
    post: state.posts.item
}
);


export default connect(mapStateToProps, {fetchPost, editPost})(QuestionContainer);
