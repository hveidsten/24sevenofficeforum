import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import QuestionsListContainer from '../Components/QuestionsListContainer';
import QuestionContainer from '../Components/QuestionContainer';
import {fetchAllCategories} from '../Actions/categoryActions';
import {connect} from 'react-redux';
import '../App.css';

class MainContentContainer extends Component {
     
componentWillMount(){
    this.props.fetchAllCategories();
  }

    render(){
        console.log(this.props);
        if(this.props.categories){
        return(
            <div>dette gikk</div>
    );
    }
    else{return <div>asd</div>}
}

    

}
const mapStateToProps = state => {
    return ({categories: state.categories});
   }
   

export default connect(mapStateToProps,{fetchAllCategories})(MainContentContainer);
