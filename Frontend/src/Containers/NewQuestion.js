import React, { Component } from 'react';
import '../App.css';
import {connect} from 'react-redux';
import {createPost} from '../Actions/postActions';

class NewQuestion extends Component{
    constructor(props) {
        super(props);
        this.state = {questionHeading: '', questionBody: '', categoryId:"1"};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
      }
   
    
      handleSubmit(event) {
         event.preventDefault();
         this.setState({postHasBeenPosted: true});
         const post = {
          header: this.state.questionHeading,
          body: this.state.questionBody,
          categoryId: this.state.categoryId,
          upvote: 0
      }
      
      console.log(post);
      this.props.createPost(post,"questions");
  
       
      }

     handlePosted(){
      this.state = {questionHeading: '', questionBody: '', postHasBeenPosted: false};
      console.log( this.props.post);
      this.props.history.push("/nytt/"+this.props.post.id);
     }

    render() {     if(this.state.postHasBeenPosted && this.props.post != undefined){this.handlePosted();}
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
      </div>
              );
          }        
}
const mapStateToProps = state => (
  {
  post: state.posts.item,
  categories: state.category.allCategories
}
);
export default connect(mapStateToProps, {createPost} )(NewQuestion);