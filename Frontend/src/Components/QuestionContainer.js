import React, { Component } from 'react';
import '../App.css';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import AddAnswerContainer from '../Containers/AddAnswerContainer';
import {editPost, deletePost, deleteAnswer,fetchPost} from '../Actions/postActions';

class QuestionContainer extends Component{

    
    constructor() {
        super(); 
        this.state = { showQuestionForm: false, Deleted:false }
        
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
    this.setState({Deleted:true});
 }
 

    render() { 
        if(this.state.Deleted){return(
            <Redirect to={"../"+this.props.match.params.categoryid} />
        );}

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
          
          
           </div>
           
         </div>

          {this.props.post.answer.map((a, key) => <div key={key}><hr/><a onClick={() => this.props.deleteAnswer(a.id)} >fjern</a> {a.body}</div>)}
          <br/>
            <span className="addPostButton" onClick={this._showQuestionForm.bind()}>Nytt svar</span>
            <span className="addPostButton" style={{background:"red"}}onClick={ (e) => {if(window.confirm("Sikker?")) {this.deletePost(e)}}}>Fjern spørsmål</span>
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
    post: state.posts.activeQuestion
}
);


export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
