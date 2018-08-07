import React, { Component } from 'react';

import {connect} from 'react-redux';
import {createPost} from '../../Actions/postActions';
import {fetchAllCategories} from '../../Actions/categoryActions';
import { Redirect } from 'react-router';
import {NewQuestionComponent} from './NewQuestionComponent';

class NewQuestion extends Component{

  componentDidMount(){
    this.props.fetchAllCategories();
  }

    constructor(props) {
        super(props);
        this.state = {questionHeading: '',
                     questionBody: '', 
                     categoryId: "nei"
                    };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
         
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state.categoryId);
        
      }

      handleSubmit(event) {
         event.preventDefault();

         const post = {
          header: this.state.questionHeading,
          body: this.state.questionBody,
          categoryId: this.state.categoryId,
          upvote: 0
      }

      post.categoryId ==="nei"? alert("Velg kategori") :
      this.props.createPost(post,"questions");
    
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
    fetchAllCategories: () => dispatch(fetchAllCategories())
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