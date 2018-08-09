import React, { Component } from 'react';
import {fetchPosts} from '../../Actions/postActions';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: ''
          }

        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }


 handleChange(event) {
    this.setState({query: event.target.value});
  }

  onClick(){
   this.props.fetchPosts(`search?id=${this.state.query}`);
  }

 render() {
   return (
     <form className="search">
       <input
         placeholder="Search: "
         value={this.state.query}
         onChange={this.handleChange}
       />
       <Link to={`../../sok/alt/${this.state.query}`}><button onClick={this.onClick}>Search</button></Link>
      
     </form>
   )
 }
}



export default connect(null, {fetchPosts})(Search);
