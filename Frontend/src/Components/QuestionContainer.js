import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost} from '../Actions/postActions';
import AddAnswerContainer from '../Containers/AddAnswerContainer';
import {editPost} from '../Actions/postActions';
import {deletePost} from '../Actions/postActions';

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
        this.props.fetchPost(this.props.match.params.questionid);
    }


 handleVote(e,up){
     let vote = this.props.post;
     if(up==1){vote.upvote++;}
     else if(up==0){vote.upvote--;}
     this.props.editPost(vote);
        console.log(this.props.post.upvote);
       
     
 }   
 
 deletePost(e){
    this.props.deletePost(this.props.post.id);
    //ENDRES
    this.props.history.push("../");
 }
 

    render() { 
      
        if(this.props.post == undefined){ return <h2>Vent</h2>;}
        else{
            console.log(this.props);
        return(
            
              <div> 
            <div className="questionContainer">
            <div className="voteCounter" >
            <h3 onClick={(e) => this.handleVote(e,1,this.props.match.params.questionid)}>▲</h3>
            <h3>{this.props.post.upvote}</h3>
            <h3 onClick={(e) => this.handleVote(e,0, this.props.match.params.questionid)}>▼</h3>
            </div>

           <div className="questionText">
            <h2>{this.props.post.header}</h2>
            <p>{this.props.post.body}</p>
            {this.props.post.answer.map((a, key) => <div key={key}>{a.body}</div>)}
          
           </div>
           
         </div>
            <span className="addPostButton" onClick={this._showQuestionForm.bind()}>Nytt svar</span>
                   
                  <span className="addPostButton" style={{background:"red"}}onClick={(e) => this.deletePost(e)}>Fjern spørsmål</span>
                  { this.state.showQuestionForm && (<AddAnswerContainer hideForm={this._showQuestionForm} />) }
            </div>
                
              );
          }   
        }     
}


const mapStateToProps = state => (
    {
    post: state.posts.activeQuestion
}
);


export default connect(mapStateToProps, {fetchPost, editPost, deletePost})(QuestionContainer);
