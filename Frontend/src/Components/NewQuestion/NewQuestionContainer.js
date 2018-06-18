import React, { Component } from 'react';

import {connect} from 'react-redux';
import {createPost} from '../../Actions/postActions';
import { Redirect } from 'react-router';

class NewQuestion extends Component{
    constructor(props) {
        super(props);
        this.state = {questionHeading: '', questionBody: '', categoryId:this.props.activeCategory.id};
    
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
                 <form onSubmit={this.handleSubmit}>
       <label >Overskrift: </label>
          <input type="text" name="questionHeading" value={this.state.questionHeading} onChange={this.handleChange} />
          <br/>
          <label>Spørsmål: </label>
          <textarea rows="10" cols="25" name="questionBody" value={this.state.questionBody} onChange={this.handleChange} />
          <br/>
         <label>Kategori: </label>
         <select size="10" name="categoryId" onInput={this.handleChange}>{this.props.categories.map((c,key) => { return <option key= {key} value={c.id}>{c.categoryName}</option>})}</select>
        <input type="submit" value="Post" />
      </form>
  
      {this.props.post && this.props.post.hasBeenPosted && <Redirect to={this.props.categories.find(c => c.id===this.props.post.categoryId).categoryName.split(' ').join('_')+"/"+this.props.post.id} />}
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