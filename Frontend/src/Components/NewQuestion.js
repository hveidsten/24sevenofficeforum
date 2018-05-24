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
         this.setState({postHasBeenPosted: true});
         const post = {
          header: this.state.questionHeading,
          body: this.state.questionBody,
          categoryId: this.props.catId,
          upvote: 0
      }
      console.log(this.props);
      console.log(post);
      this.props.createPost(post);
  
       
      }

     handlePosted(){
      this.state = {questionHeading: '', questionBody: '', postHasBeenPosted: false};
      console.log(this.props);
      window.location.reload()
     }

    render() {       if(this.state.postHasBeenPosted && this.props.post != undefined){this.handlePosted();}
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
const mapStateToProps = state => (
  {
  post: state.posts.item
}
);
export default connect(mapStateToProps, {createPost} )(NewQuestion);