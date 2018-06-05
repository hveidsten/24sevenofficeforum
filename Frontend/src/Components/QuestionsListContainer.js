import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchPosts} from '../Actions/postActions';
import {Link} from 'react-router-dom';

import  QuestionInList from './QuestionInList';

class QuestionsListContainer extends Component{

     componentWillMount(){
          if(this.props.match.params.searchQuery){
            this.props.fetchPosts(`search?id=${this.props.match.params.searchQuery}`);
          }else{
           
            this.props.fetchPosts(`questions/${this.props.activeCategory}`);
          }
          
      
    } 

    render() {
        if(!this.props.posts || !this.props.posts.data.length ===0){return <h2>Vent</h2>;}
      else{ return(
               <div> 
              {this.props.posts.data.map(
                    (c, key) => {
                        return (
                        <QuestionInList heading={c.header} body={c.body} linkToQuestion={this.props.match.path+"/"+c.id} votes={c.upvote} key={key}/>
                    )
                   }
              )}
            
                   <Link to='./nytt_sporsmal'> <span className="addPostButton">Nytt spørsmål</span></Link>
                   
                  </div>
            );
          }
        }
}


const mapStateToProps = state => ({
            
            posts: state.posts.allQuestionsInCategory
})

export default connect(mapStateToProps, {fetchPosts})(QuestionsListContainer);
