import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {QuestionWrapper} from '../CommonStyledComponents';


class QuestionInList extends React.Component{

    render(){
    return (
        <QuestionWrapper>
            <div className="voteCounter" >
            <h3>{this.props.votes}</h3>
            </div>

            <NavLink to={this.props.linkToQuestion} className="questionText">
            <h2>{this.props.heading}</h2>
            <p>{this.props.body}</p>
            </NavLink>
         </QuestionWrapper>

       );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps)(QuestionInList);
