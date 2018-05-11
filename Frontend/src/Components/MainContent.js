import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchPosts} from '../Actions/postActions';


import NewQuestion from './NewQuestion';

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
                    (c, key) => {return <Link to={this.props.match.path+"/"+c.id} key={key}><h2>{c.header}</h2></Link>
                   }
              )}
              { this.state.showQuestionForm && (<NewQuestion />) }
                    <button onClick={this._showQuestionForm.bind()}>Nytt spørsmål</button>
                  </div>
            );
          }
        }
}



/* <h2>{this.props.activeCategory}</h2>
                   {this.props.data.questions.map((q, key) => <Link to={this.props.data.id + "/" +q.id} key={key}><h3>{q.heading}</h3> <p>{q.body}</p><hr/></Link>)}
                    { this.state.showQuestionForm && (<NewQuestion />) }
                    <button onClick={this._showQuestionForm.bind()}>Nytt spørsmål</button>

MainContent.propTypes = {
    fetchPost: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}
 */
const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps, {fetchPosts})(MainContent);
