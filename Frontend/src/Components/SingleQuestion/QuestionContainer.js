import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import AddAnswerContainer from './AddAnswerContainer';
import AnswerComponent from './AnswerComponent';
import {editPost, deletePost, deleteAnswer,editAnswer,fetchPost} from '../../Actions/postActions';
import {fetchSingleCategory} from '../../Actions/categoryActions';
import {Button} from '../CommonStyledComponents';
import QuestionComponent from './QuestionComponent';


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
        this.props.fetchPost(this.props.match.params.questionid).then(e => 
            this.props.fetchSingleCategory(e.payload.categoryId));
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
            console.log(this.props.user);
            return(
                
             <div> 
                 <QuestionComponent 
                 user={this.props.user} 
                 question={this.props.post}  
                 handleVote = {this.handleVote}  
                 categoryId = {this.props.match.params.categoryid}/>
       

         {this.props.post.answer.map((a, key) => <AnswerComponent answer={a} deleteAnswer={this.props.deleteAnswer} editAnswer={this.props.editAnswer} key={key} />)}
         
          <br/>

           {this.props.user.isLoggedIn && ( <div>
          <Button primary onClick={this._showQuestionForm.bind()}>Nytt svar</Button>
            <Button className="addPostButton" style={{background:"red"}
            }onClick={ (e) => {if(window.confirm("Sikker på at du vil fjerne spørsmålet?")) {this.deletePost(e)}}}>Fjern spørsmål</Button>
            </div> )}

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
        deleteAnswer: (a) => dispatch(deleteAnswer(a)),
        editAnswer: (a,body) => dispatch(editAnswer(a, body)),
        fetchSingleCategory: (a) => dispatch(fetchSingleCategory(a))
    };
  };

const mapStateToProps = state => (
    {
    post: state.posts.activeQuestion,
    user:state.user,
    category: state.category.currentCategory
}
);


export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
