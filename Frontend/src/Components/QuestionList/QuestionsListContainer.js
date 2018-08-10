import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../../Actions/postActions';
import {Link} from 'react-router-dom';
import {fetchSingleCategory} from '../../Actions/categoryActions';
import  QuestionInList from './QuestionInList';
import {Button} from '../CommonStyledComponents';

class QuestionsListContainer extends Component{

     componentDidMount(){
          if(this.props.match.params.searchQuery){
             this.props.fetchPosts(`search?id=${this.props.match.params.searchQuery}`);
          }else{
            this.props.fetchSingleCategory(this.props.activeCategory);
            this.props.fetchPosts(`questions/?categoryId=${this.props.activeCategory}&sortOrder=vote_asc`);
          }
    } 

    render() {
      
        if(!this.props.questions || !this.props.categories){return <h2>Vent</h2>;}
      else{ return(
               <Fragment> 
                 <h2>{this.props.match.params.searchQuery? "Søkeresultater for "+this.props.match.params.searchQuery : this.props.category && this.props.category.categoryName}</h2>
                 <p>Sort by: <select>
                   <option>Date - descending</option>
                   </select></p>
              {this.props.questions.map(
                    (c, key) => {
                        return (
                        <QuestionInList linkToQuestion={"../../"+this.props.categories.find(a => a.id===c.categoryId).categoryName.replace(' ','_')+"/"+c.id} question={c} key={key}/>
                    )
                   }
              )}
                 {this.props.user.isLoggedIn?  <Link to='./new_question'> <Button color="#49bd39">New question</Button></Link>:""}
                  </Fragment>
            );
          }
        }
}


const mapStateToProps = state => ({
            category: state.category.currentCategory,
            categories: state.category.allCategories,
            questions: state.posts.allQuestionsInCategory,
            user:state.user
});

export default connect(mapStateToProps, {fetchPosts, fetchSingleCategory})(QuestionsListContainer);
