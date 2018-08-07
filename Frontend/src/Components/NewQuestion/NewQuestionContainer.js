import React, { Component } from 'react';

import {connect} from 'react-redux';
import {createPost, editPost} from '../../Actions/postActions';
import {fetchAllCategories} from '../../Actions/categoryActions';
import { Redirect } from 'react-router';
import {NewQuestionComponent} from './NewQuestionComponent';

class NewQuestion extends Component{

  componentDidMount(){
    this.props.fetchAllCategories();
  }

    constructor(props) {
        super(props);
        const endre = this.props.match.path==="/endre_sporsmal"&& this.props.post;
        this.state = {questionHeading: endre? this.props.post.header:"",
                     questionBody: endre? this.props.post.body:"", 
                     categoryId: endre? this.props.post.categoryId:"nei"
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
          categoryId: this.state.categoryId
      }
      if(this.props.match.path==="/endre_sporsmal" && this.props.post && post.categoryId !=="nei")
      { post.id = this.props.post.id;
        post.upvote = this.props.post.upvote;
        this.props.editPost(post);
      }else if(post.categoryId ==="nei"){
        alert("Velg kategori");
    
      }else{
        post.upvote = 0;
        this.props.createPost(post,"questions");
      }

      }

    render() {  
              if(this.props.categories){ return(
                 <div className="newQuestionForm">

                  <NewQuestionComponent 
                  handleSubmit={this.handleSubmit}
                  questionHeading = {this.state.questionHeading}
                  handleChange = {this.handleChange}
                  questionBody = {this.state.questionBody}
                  categories = {this.props.categories}
                  categoryId = {this.state.categoryId}
                  endre = {this.props.match.path==="/endre_sporsmal"&& this.props.post}
                  />
       
                {/*Redirect om spørsmål er postet.*/}
      {this.props.post && this.props.post.hasBeenPosted && 
      <Redirect to={this.props.categories.find(c => c.id===this.props.post.categoryId).categoryName.replace(' ','_')+"/"+this.props.post.id} />}

      </div>

              )}else {return(<h2>vent</h2>)}
          }        
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    createPost: (post,path) => dispatch(createPost(post,path)),
    fetchAllCategories: () => dispatch(fetchAllCategories()),
    editPost: (post) => dispatch(editPost(post))
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