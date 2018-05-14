import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost} from '../Actions/postActions';

import  {QuestionInList} from './PresentationalComponents';


class QuestionContainer extends Component{
    componentWillMount(){
        this.props.fetchPost(this.props.match.params.questionid);
        console.log("api/questions/"+this.props.match.params.questionid);
    }

    render() { 
        
        if(!this.props.post){return <h2>Vent</h2>;}
        else{
           
            console.log(this.props.post.data.answer); 
        return(
               <div> 
                   <h2>{this.props.post.data.header}</h2>
                   <p>{this.props.post.data.body}</p>
                   {this.props.post.data.answer.map((a, key) => <div key={key}>{a.body}</div>)}
                 </div>
              );
          }   
        }     
}


const mapStateToProps = state => ({
    post: state.posts.item
})

export default connect(mapStateToProps, {fetchPost})(QuestionContainer);


