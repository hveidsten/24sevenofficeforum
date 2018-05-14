import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPosts} from '../Actions/postActions';

import NewQuestion from '../Components/NewQuestion';
import  {QuestionInList} from './PresentationalComponents';

class MainContent extends Component{

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
          console.log(this.props.activeCategory+1);
        this.props.fetchPosts(this.props.activeCategory+1);
    }


    render() {
       console.log(this.props);
        if(!this.props.posts || !this.props.posts.data.length ===0){return <h2>Vent</h2>;}
     else{ return(
               <div> 
              {this.props.posts.data.map(
                    (c, key) => {return <Link to={this.props.match.path+"/"+c.id} key={key}>
                    
                        <QuestionInList heading={c.header} body={c.body}/>
                       </Link>
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

export default connect(mapStateToProps, {fetchPosts})(MainContent);
