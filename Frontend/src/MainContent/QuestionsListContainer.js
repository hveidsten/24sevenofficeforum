import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchPosts} from '../Actions/postActions';
import {Link} from 'react-router-dom';
import {fetchSingleCategory} from '../Actions/categoryActions';
import  QuestionInList from './QuestionInList';

class QuestionsListContainer extends Component{

     componentDidMount(){
          if(this.props.match.params.searchQuery){
          
             this.props.fetchPosts(`search?id=${this.props.match.params.searchQuery}`);
          }else{
            this.props.fetchSingleCategory(this.props.activeCategory);
            this.props.fetchPosts(`questions/${this.props.activeCategory}`);
          }
    } 


    render() {
        if(!this.props.posts || !this.props.posts.length ===0){return <h2>Vent</h2>;}
      else{ return(
               <div> 
              {this.props.posts.map(
                    (c, key) => {
                        return (
                        <QuestionInList heading={c.header} body={c.body} linkToQuestion={"../../"+this.props.categories.find(a => a.id===c.categoryId).categoryName.split(' ').join('_')+"/"+c.id} votes={c.upvote} key={key}/>
                    )
                   }
              )}
            
                 {this.props.user.isLoggedIn?  <Link to='./nytt_sporsmal'> <span className="addPostButton">Nytt spørsmål</span></Link>:""}
                   
                  </div>
            );
          }
        }
}


const mapStateToProps = state => ({
            categories: state.category.allCategories,
            posts: state.posts.allQuestionsInCategory,
            user:state.user
});

export default connect(mapStateToProps, {fetchPosts, fetchSingleCategory})(QuestionsListContainer);
