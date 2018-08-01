import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../../Actions/postActions';
import {Link} from 'react-router-dom';
import {fetchSingleCategory} from '../../Actions/categoryActions';
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
        if(!this.props.posts){return <h2>Vent</h2>;}
      else{ return(
               <div> 
                 <h2>{this.props.categories.find( c => {return c.id === this.props.activeCategory}).categoryName}</h2>
                 <p>Sorter etter: 
                 <select>
                   <option>Dato</option>
                   </select></p>
              {this.props.posts.map(
                    (c, key) => {
                        return (
                        <QuestionInList linkToQuestion={"../../"+this.props.categories.find(a => a.id===c.categoryId).categoryName.replace(' ','_')+"/"+c.id} question={c} key={key}/>
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
