import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPost} from '../Actions/postActions';


import NewQuestion from './NewQuestion';

class MainContent extends Component{

    constructor() {
        console.log("this");
        super(); 
        this.state = { showQuestionForm: false }
      }

      _showQuestionForm = () => {
        this.setState({
            showQuestionForm: !this.state.showQuestionForm
        });
      }


      componentWillMount(){
        this.props.fetchPost();
    }



    render() {
       
               return(
              <div> 
              {this.props.posts.map(
                    c => {return <h3>{c.header}</h3>
                    console.log(c);}
              )}
                  </div>
              );
          }
        
         
}



/* <h2>{this.props.activeCategory}</h2>
                   {this.props.data.questions.map((q, key) => <Link to={this.props.data.id + "/" +q.id} key={key}><h3>{q.heading}</h3> <p>{q.body}</p><hr/></Link>)}
                    { this.state.showQuestionForm && (<NewQuestion />) }
                    <button onClick={this._showQuestionForm.bind()}>Nytt spørsmål</button> */

MainContent.propTypes = {
    fetchPost: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps, {fetchPost})(MainContent);
