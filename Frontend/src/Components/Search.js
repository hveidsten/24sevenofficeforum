import React, { Component } from 'react';
import {fetchPosts} from '../Actions/postActions';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: ''
          }

        this.handleChange = this.handleChange.bind(this);
    }


 handleChange(event) {
    this.setState({query: event.target.value});
  }


 render() {
   return (
     <form>
       <input
         placeholder="Søk: "
         value={this.state.query}
         onChange={this.handleChange}
       />
       <Link to={`../../sok/alt/${this.state.query}`}><button onClick={() => this.props.fetchPosts(`search?id=${this.state.query}`)}>søk</button></Link>
      
     </form>
   )
 }
}


const mapStateToProps = state => ({
  posts: state.posts.items
})

export default connect(mapStateToProps, {fetchPosts})(Search);
