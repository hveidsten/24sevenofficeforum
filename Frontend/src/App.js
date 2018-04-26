import React, { Component } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';

class Question extends Component {
  render() {
    return(
      <div>
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
        <Header />
        <Sidebar categories={this.state.data} />
        <div className="Content" >
           {this.state.data.map((c, i) => <Question category={c.category} questions={c.questions} key={i}/>) }
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit augue, sollicitudin non tristique sit amet, finibus sagittis felis. Praesent vulputate mi felis, id laoreet dui ultricies sit amet. Integer at dui ac nunc condimentum tristique non vitae quam. Nullam posuere iaculis elit. In rhoncus enim eget rhoncus maximus. Duis eleifend est lacus. Morbi et consectetur nisi, ornare finibus lorem. Aliquam ornare aliquet convallis.</p>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit augue, sollicitudin non tristique sit amet, finibus sagittis felis. Praesent vulputate mi felis, id laoreet dui ultricies sit amet. Integer at dui ac nunc condimentum tristique non vitae quam. Nullam posuere iaculis elit. In rhoncus enim eget rhoncus maximus. Duis eleifend est lacus. Morbi et consectetur nisi, ornare finibus lorem. Aliquam ornare aliquet convallis.</p>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit augue, sollicitudin non tristique sit amet, finibus sagittis felis. Praesent vulputate mi felis, id laoreet dui ultricies sit amet. Integer at dui ac nunc condimentum tristique non vitae quam. Nullam posuere iaculis elit. In rhoncus enim eget rhoncus maximus. Duis eleifend est lacus. Morbi et consectetur nisi, ornare finibus lorem. Aliquam ornare aliquet convallis.</p>
        </div>
      </div>
    );
  }
}

export default App;
