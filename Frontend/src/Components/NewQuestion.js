import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createPost} from '../Actions/postActions';

class NewQuestion extends Component{
    constructor(props) {
        super(props);
        this.state = {questionHeading: '', questionBody: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
   
    
      handleSubmit(event) {
         event.preventDefault();
         const post = {
          header: this.state.questionHeading,
          body: this.state.questionBody,
          categoryId: this.props.catId,
          upvote: 0
      }
      console.log(post);
      this.props.createPost(post);
      window.location.reload();
       
      }
    render() {
               return(
                 <div className="newQuestionForm">
                 <form onSubmit={this.handleSubmit}>
       <label >Overskrift: </label>
          <input type="text" name="questionHeading" value={this.state.questionHeading} onChange={this.handleChange} />
          <br/>
          <label>Spørsmål: </label>
          <textarea rows="10" cols="25" name="questionBody" value={this.state.questionBody} onChange={this.handleChange} />
          <br/>   
         
        <input type="submit" value="Post" />
      </form>
      </div>
              );
          }        
}
NewQuestion.prototypes = {
  createPost: PropTypes.func.isRequired
}

export default connect(null, {createPost} )(NewQuestion);