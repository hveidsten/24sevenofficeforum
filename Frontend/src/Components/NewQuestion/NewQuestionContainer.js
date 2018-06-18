import React, { Component } from 'react';

import {connect} from 'react-redux';
import {createPost} from '../../Actions/postActions';
import { Redirect } from 'react-router';
import {NewQuestionComponent} from './NewQuestionComponent';

class NewQuestion extends Component{
    constructor(props) {
        super(props);
        this.state = {questionHeading: '',
                     questionBody: '', 
                     categoryId:this.props.activeCategory?this.props.activeCategory.id:1
                    };
    
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
          categoryId: this.state.categoryId,
          upvote: 0
      }

      this.props.createPost(post,"questions");
    
      }

    render() {    
               return(
                 <div className="newQuestionForm">

                  <NewQuestionComponent 
                  handleSubmit={this.handleSubmit}
                  questionHeading = {this.state.questionHeading}
                  handleChange = {this.handleChange}
                  questionBody = {this.state.questionBody}
                  categories = {this.props.categories}
                  />
       
                {/*Redirect om spørsmål er postet.*/}
      {this.props.post && this.props.post.hasBeenPosted && 
      <Redirect to={this.props.categories.find(c => c.id===this.props.post.categoryId).categoryName.replace(' ','_')+"/"+this.props.post.id} />}

      </div>

              );
          }        
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    createPost: (post,path) => dispatch(createPost(post,path))
  };
};

const mapStateToProps = state => (
  {
  post: state.posts.activeQuestion,
  categories: state.category.allCategories,
  activeCategory: state.category.currentCategory
}
);
export default connect(mapStateToProps, mapDispatchToProps )(NewQuestion);