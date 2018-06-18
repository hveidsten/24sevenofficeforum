import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import {createAnswer} from '../Actions/postActions';

class AddAnswerContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
          questionBody: '',
          showAnswerForm: false
      };
    
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      _showAnswerForm = () => {
        this.setState({
          showAnswerForm: !this.state.showAnswerForm
        });
      }
    
      handleChangeBody(event) {
        this.setState({questionBody: event.target.value});
      }


      handleSubmit(event) {
        event.preventDefault();
        const post = {
         body: this.state.questionBody,
         questionId: this.props.post.id,
         upvote: 0
     } 
     console.log(post);
     this.props.createAnswer(post,"answers");
     this.props.hideForm();
     }


    render() {
               return(
                 <form onSubmit={this.handleSubmit}>
       
             <input type="text" value={this.state.questionBody} onChange={this.handleChangeBody} />
        
               <input type="submit" value="Post" />
            </form>
              );
          }        
}

const mapStateToProps = state => (
  {
  post: state.posts.activeQuestion
}
);

export default connect(mapStateToProps, {createAnswer} )(AddAnswerContainer);
