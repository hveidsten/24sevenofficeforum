import React, { Component } from 'react';
import './App.css';

class Question extends Component {
  render() {
    return(
      <div>
      <h2>{this.props.category}</h2>
      {this.props.questions.map(q => <div><h3>{q.heading}</h3> <p>{q.body}</p></div>)}
</div>
    );
  }
}

class App extends Component {
constructor(props){
  super(props);
  this.state={
    data: []
  }
}

componentDidMount(){
const url = "https://5adf192bbf932f0014d11b7c.mockapi.io/kategorier";
fetch(url)
.then(response => response.json())
.then(json => this.setState({data:json}))
}

  render() {
    return (
      <div className="App">
        {this.state.data.map((c, i) => <Question category={c.category} questions={c.questions} key={i}/>) }
      </div>
    );
  }
}

export default App;
