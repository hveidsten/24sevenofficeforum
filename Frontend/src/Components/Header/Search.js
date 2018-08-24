import React, { Component } from 'react';
import { fetch } from '../../Actions/postActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }


  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  onClick() {
    if(this.state.query!==''){
    this.props.fetch(`search?id=${this.state.query}`, "FETCH_POSTS");
    this.setState({ query: "" });
  }else{
    alert("Fail");
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
        <Link to={`../../sok/alt/${this.state.query}`}><button onClick={this.onClick}>Search</button></Link>
      </form>
    )
  }
}

export default connect(null, { fetch })(Search);
