import React, { Component } from 'react';
import './App.css';

class App extends Component {
constructor(props){
  super(props);
  this.state={
    values: []
  }
}

componentDidMount(){
const url = "./api/values";
fetch(url)
.then(response => response.text())
.then(contents => this.setState({values: contents}))
}

  render() {
    return (
      <div className="App">
     <h3>{this.state.values}</h3>
      </div>
    );
  }
}

export default App;
