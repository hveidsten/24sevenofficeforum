import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from '../node_modules/axios/dist/axios';
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
axios.get(url)
.then(response => this.setState({data: response.data}))
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

        <Route exact path="/" render={() => <h2>Dette er forside som kanskje skal vise siste poster.</h2>}/>
        <Route exact path="/1" render={(props) => <Category data={this.state.data[0]}  {...props} />}/>
        <Route exact path="/2" render={(props) => <Category data={this.state.data[1]} {...props} />}/>
        <Route path="/:categoryid/:questionid" render={(props) => <Question data={this.state.data} {...props} />}/>
        </div>
      </div>
      </BrowserRouter>
    
    );
  }
}

export default App;
