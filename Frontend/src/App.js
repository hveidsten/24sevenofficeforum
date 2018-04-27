import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Category from './Components/Category';
import Question from './Components/Question';



class App extends Component {
constructor(props){
  super(props);
  this.state={
    data: []
  }
}

fetchData(){
  const url = "https://5adf192bbf932f0014d11b7c.mockapi.io/kategorier";
fetch(url)
.then(response => response.json())
.then(json => this.setState({data:json}))
}

componentWillMount(){
  this.fetchData();
}

  render() {
    
    return (
       <BrowserRouter>
      <div className="App">
     
        <Header />
        <Sidebar categories={this.state.data} />

        <div className="Content" >
        <Route path="/1" render={(props) => <Category data={this.state.data[0]}  {...props} />}/>
        <Route path="/2" render={(props) => <Category data={this.state.data[1]} {...props} />}/>
        <Route path="/question/:categoryid/:questionid" render={(props) => <Question data={this.state.data} {...props} />}/>
        </div>

      </div>

      </BrowserRouter>
    
    );
  }
}

export default App;
