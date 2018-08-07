import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createAnswer, editAnswer} from '../../Actions/postActions';
import { AddAnswerModal } from './styledComponents';
import {Button} from '../CommonStyledComponents';

class AddAnswerContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
          questionBody: this.props.answer.id? this.props.answer.body : "",
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
     if(this.props.answer.id){
       post.id = this.props.answer.id;
       this.props.editAnswer(post);
     }else{
     this.props.createAnswer(post,"answers");
    }
     this.props.hideForm();
     }


    render() {
      console.log(this.props);
               return(
                 
                 <AddAnswerModal>
                   <h3>{this.props.answer.id? "Endre svar":"Nytt svar"}</h3>
                 <form onSubmit={this.handleSubmit}>
       
                    <textarea rows="20" cols="75" autoFocus value={this.state.questionBody} onChange={this.handleChangeBody} />
                    <Button style={{float:"right"}} color="green" onClick={this.handleSubmit}>
                      {this.props.answer.id? "Lagre endringer":"Post"}
                      </Button>
                    <Button style={{float:"right"}} color="#f04b4b" onClick={this.props.hideForm}>Lukk</Button>

                </form>
                </AddAnswerModal>
              );
          }        
}

const mapStateToProps = state => (
  {
  post: state.posts.activeQuestion
}
);

export default connect(mapStateToProps, {createAnswer, editAnswer} )(AddAnswerContainer);
