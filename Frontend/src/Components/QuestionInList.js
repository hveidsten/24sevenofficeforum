import React from 'react';
import '../App.css';
import Search from './Search';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';


class QuestionInList extends React.Component{

    render(){
    return (
        <div className="questionContainer">
            <div className="voteCounter" >
          
            <h3>{this.props.votes}</h3>
            
            </div>

            <NavLink to={this.props.linkToQuestion} className="questionText">
            <h2>{this.props.heading}</h2>
            <p>{this.props.body}</p>
            </NavLink>
            <hr/>
         </div>

       );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps)(QuestionInList);
