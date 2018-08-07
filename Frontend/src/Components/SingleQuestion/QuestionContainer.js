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
        this.state = { showQuestionForm: false, Deleted:false}
        this.handleVote = this.handleVote.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.editPost = this.editPost.bind(this);
      }

      _showQuestionForm = (a) => {
        this.setState({
            showQuestionForm: !this.state.showQuestionForm,
            answer: a
        });

        this._showQuestionForm = this._showQuestionForm.bind(this);
       
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
 
 deletePost(e){
    this.props.deletePost(this.props.post.id);
    this.setState({Deleted:true});
 }

 editPost(e){
   this.props.history.push("../endre_sporsmal");
 }
 

    render() { 
        if(this.state.Deleted){return(
            <Redirect to={"../"+this.props.match.params.categoryid} />
        );}

        if(this.props.post === undefined){ return <h2>Vent</h2>;}
        
        else{
            return(
             <div> 
                {this.state.showQuestionForm&&<Modal onclick={this._showQuestionForm}/>}
                 <QuestionComponent 
                 user={this.props.user} 
                 question={this.props.post}  
                 handleVote = {this.handleVote}  
                 categoryId = {this.props.match.params.categoryid}
                 deletePost = {this.deletePost}
                 editPost = {this.editPost}/>

                 <p>Sorter etter: <select>
                   <option>Dato - nyeste først</option>
                   <option>Dette virker uansett ikke ennå</option>
                   </select></p>

         {this.props.post.answer.map((a, key) =>
          <AnswerComponent answer={a} 
          deleteAnswer={this.props.deleteAnswer} 
          editAnswer={this.props.editAnswer} 
          handleVote = {this.handleVote}  
          user={this.props.user}  
          categoryId = {this.props.match.params.categoryid}
          _showQuestionForm={this._showQuestionForm.bind(this, a)}
          key={key} />)}
         
          <br/>

           {this.props.user.isLoggedIn &&( <div>
               {this.state.showQuestionForm===false?
                <Button color="#49bd39" onClick={this._showQuestionForm.bind()}>Nytt svar</Button>:
                <Button color="#f04b4b" onClick={this._showQuestionForm.bind()}>Lukk</Button>
               }
         
           
            </div> )}

             { this.state.showQuestionForm && (<AddAnswerContainer answer={this.state.answer}  hideForm={this._showQuestionForm.bind()} />) }

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


const Modal = ({onclick}) => {
    return(
        <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
        zIndex: '9998',
        background: 'rgba(0, 0, 0, 0.1)'
        }}
        onClick={onclick}
       >
        
        </div>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
