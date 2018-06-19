import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import AddAnswerContainer from './AddAnswerContainer';
import {editPost, deletePost, deleteAnswer,fetchPost} from '../../Actions/postActions';
import {QuestionVoteComponent} from './QuestionVoteComponent';

import {Button, QuestionWrapper} from '../CommonStyledComponents';



class QuestionContainer extends Component{

    
    constructor() {
        super(); 
        this.state = { showQuestionForm: false, Deleted:false }
        this.handleVote =this.handleVote.bind(this);
      }

      _showQuestionForm = () => {
        this.setState({
            showQuestionForm: !this.state.showQuestionForm
        });
      }
   
    componentDidMount(){
        this.props.fetchPost(this.props.match.params.questionid);
    }


 handleVote(up,id){
     let vote = this.props.post;
     if(up===1){vote.upvote++;}
     else if(up===0){vote.upvote--;}
     this.props.editPost(vote,id);
       
 }   
 
 deletePost(e){
    this.props.deletePost(this.props.post.id);
    this.setState({Deleted:true});
 }
 

    render() { 
        if(this.state.Deleted){return(
            <Redirect to={"../"+this.props.match.params.categoryid} />
        );}

        if(this.props.post === undefined){ return <h2>Vent</h2>;}
        
        else{
        return(
             <div> 
            <QuestionWrapper>
            <QuestionVoteComponent 
            isLoggedIn = {this.props.user.isLoggedIn}
            votes = {this.props.post.upvote}
            handleVote = {this.handleVote}
            id = {this.props.match.params.categoryid}
            />
           
           <div className="questionText">
            <h2>{this.props.post.header}</h2>
            <p>{this.props.post.body}</p>
          
          
           </div>
           
         </QuestionWrapper>

          {this.props.post.answer.map((a, key) => <div key={key}><hr/><a onClick={() => this.props.deleteAnswer(a.id)} >fjern</a> {a.body}</div>)}

          <br/>

           {this.props.user.isLoggedIn? <div> <Button primary onClick={this._showQuestionForm.bind()}>Nytt svar</Button>
            <Button className="addPostButton" style={{background:"red"}}onClick={ (e) => {if(window.confirm("Sikker?")) {this.deletePost(e)}}}>Fjern spørsmål</Button></div>:""}

                  { this.state.showQuestionForm && (<AddAnswerContainer hideForm={this._showQuestionForm} />) }

                  
            </div>
                
              );
          }   
        }     
}

const mapDispatchToProps = (dispatch) => {
  
    return {
        fetchPost: (a) => dispatch(fetchPost(a)),
        editPost: (a) => dispatch(editPost(a)),
        deletePost: (a) => dispatch(deletePost(a)),
        deleteAnswer: (a) => dispatch(deleteAnswer(a))
    };
  };

const mapStateToProps = state => (
    {
    post: state.posts.activeQuestion,
    user:state.user
}
);


export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
