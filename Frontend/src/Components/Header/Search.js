import React, { Component } from 'react';
import { fetchQuestions } from '../../Actions/questionActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      redirect : false
    }

    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }


  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  onClick() {
   
    if(this.state.query!==''){
    this.props.fetchQuestions(0,1,"desc",this.state.query);
    this.setState({ query: "" });
    
  }else{
    alert("Please type in your query");
  }
   
  }

  render() {
    return (
      
      <form className="search">
        <input
          placeholder="Search: "
          value={this.state.query}
          onChange={this.handleChange}
        />
        <Link to={this.state.query !==""? `../../sok/alt/${this.state.query}`:"#"}><button onClick={this.onClick}>Search</button></Link>
      </form>
    )
  }
}




export default connect(null, { fetchQuestions })(Search);
