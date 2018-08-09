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
            this.props.fetchPosts(`questions/${this.props.activeCategory}`);
          }
    } 

    render() {
      
        if(!this.props.questions || !this.props.categories){return <h2>Vent</h2>;}
      else{ return(
               <Fragment> 
                 <h2>{this.props.match.params.searchQuery? "Søkeresultater for "+this.props.match.params.searchQuery : this.props.category && this.props.category.categoryName}</h2>
                 <p>Sorter etter: <select>
                   <option>Dato - nyeste først</option>
                   </select></p>
              {this.props.questions.map(
                    (c, key) => {
                        return (
                        <QuestionInList linkToQuestion={"../../"+this.props.categories.find(a => a.id===c.categoryId).categoryName.replace(' ','_')+"/"+c.id} question={c} key={key}/>
                    )
                   }
              )}
            
                 {this.props.user.isLoggedIn?  <Link to='./nytt_sporsmal'> <Button color="#49bd39">Nytt spørsmål</Button></Link>:""}
                   
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
