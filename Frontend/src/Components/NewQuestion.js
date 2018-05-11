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
        /*axios.post('https://5adf192bbf932f0014d11b7c.mockapi.io/kategorier/3', {  
           questions: [{heading: this.state.questionHeading,
            body: this.state.questionBody}]
          })
          */
         event.preventDefault();
         const post = {
          header: this.state.questionHeading,
          body: this.state.questionBody
      }
      this.props.createPost(post);
       
       
      }
    render() {
               return(
                 <form onSubmit={this.handleSubmit}>
       
          <input type="text" name="questionHeading" value={this.state.questionHeading} onChange={this.handleChange} />
          <input type="text" name="questionBody" value={this.state.questionBody} onChange={this.handleChange} />
        
        <input type="submit" value="Post" />
      </form>
              );
          }        
}
NewQuestion.prototypes = {
  createPost: PropTypes.func.isRequired
}

export default connect(null, {createPost} )(NewQuestion);