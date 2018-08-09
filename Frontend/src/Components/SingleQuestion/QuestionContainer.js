import React, { Component, Fragment } from 'react';

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
        this.state = { showQuestionForm: false, Deleted:false}
        this.handleVote = this.handleVote.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);
        this.toggleQuestionform = this.toggleQuestionform.bind(this);
      }

      toggleQuestionform (a){
        this.setState({
            showQuestionForm: !this.state.showQuestionForm,
            answer: a
        });

        
       
      }
   
    componentDidMount(){
        this.props.fetchPost(this.props.match.params.questionid).then(e => 
            this.props.fetchSingleCategory(e.payload.categoryId));
    }


 handleVote(up, id, answer){
     if(answer){
         const vote = answer;
         up===1 ? vote.upvote++ : vote.upvote--;
         this.props.editAnswer(vote,id);  
     }else{
        let vote = this.props.post;
        up===1 ? vote.upvote++ : vote.upvote--;
        this.props.editPost(vote,id);   
     }
 }   
 
 deletePost(){
    if(window.confirm("Sikker på at du vil fjerne spørsmålet?")) {
    this.props.deletePost(this.props.post.id);
    this.setState({Deleted:true});
}
 }

 editPost(e){
   this.props.history.push("../edit_question");
 }
 

    render() { 
        if(this.state.Deleted){return(
            <Redirect to={"../"+this.props.match.params.categoryid} />
        );}

        if(this.props.post === undefined){ return <h2>Vent</h2>;}
        
        else{
            return(
             <Fragment> 
               
                 <QuestionComponent 
                 user={this.props.user} 
                 question={this.props.post}  
                 handleVote = {this.handleVote}  
                 categoryId = {this.props.match.params.categoryid}
                 deletePost = {this.deletePost}
                 editPost = {this.editPost}/>

                 <p>Sort by: <select>
                   <option>Date - descending</option>
                   </select></p>

         {this.props.post.answer.map((a, key) =>
          <AnswerComponent answer={a} 
          deleteAnswer={this.props.deleteAnswer} 
          editAnswer={this.props.editAnswer} 
          handleVote = {this.handleVote}  
          user={this.props.user}  
          categoryId = {this.props.match.params.categoryid}
          toggleQuestionform={() => this.toggleQuestionform(a)}
          key={key} />)}
         
          <br/>

           {this.props.user.isLoggedIn &&( <div>
               {this.state.showQuestionForm===false?
                <Button color="#49bd39" onClick={ this.toggleQuestionform}>New answer</Button>:
                <Button color="#f04b4b" onClick={ this.toggleQuestionform}>Close</Button>
               }
         
           
            </div> )}

             { this.state.showQuestionForm && (<AddAnswerContainer answer={this.state.answer}  hideForm={ this.toggleQuestionform} />) }

            </Fragment>
                
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
        editAnswer: (a) => dispatch(editAnswer(a)),
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
