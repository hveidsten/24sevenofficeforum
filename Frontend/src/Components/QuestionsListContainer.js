import React, { Component } from 'react';
import '../App.css';

import {connect} from 'react-redux';
import {fetchPosts} from '../Actions/postActions';

import NewQuestion from '../Components/NewQuestion';
import  QuestionInList from './QuestionInList';

class QuestionsListContainer extends Component{

    constructor() {
        super(); 
        this.state = { showQuestionForm: false }
        
      }

      _showQuestionForm = () => {
        this.setState({
            showQuestionForm: !this.state.showQuestionForm
        });
      }

      componentWillMount(){
          if(this.props.match.params.searchQuery){
            this.props.fetchPosts(`search?id=${this.props.match.params.searchQuery}`);
            console.log(`search?id=${this.props.match.params.searchQuery}`);
          }else{
           
            this.props.fetchPosts(`questions/${this.props.activeCategory+1}`);
          }
          
          
       
    }


    render() {
      console.log(this.props.match.params.searchQuery);
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
              { this.state.showQuestionForm && (<NewQuestion />) }
                    <button onClick={this._showQuestionForm.bind()}>Nytt spørsmål</button>
                  </div>
            );
          }
        }
}


const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps, {fetchPosts})(QuestionsListContainer);
