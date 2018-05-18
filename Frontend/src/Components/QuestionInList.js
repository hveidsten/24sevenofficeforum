import React from 'react';
import '../App.css';
import Search from './Search';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';


class QuestionInList extends React.Component{

    render(){
    console.log(this.props.posts.data);
    return (
        <div className="questionContainer">
            <div className="voteCounter" >
          
            <h3>{this.props.votes}</h3>
            
            </div>

            <Link to={this.props.linkToQuestion} className="questionText">
            <h2>{this.props.heading}</h2>
            <p>{this.props.body}</p>
            </Link>
            <hr/>
         </div>

       );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps)(QuestionInList);
