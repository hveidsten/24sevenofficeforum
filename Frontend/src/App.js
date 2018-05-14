import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import './App.css';

import Sidebar from './Components/Sidebar';
import {Header} from './Components/PresentationalComponents';
import rootReducer from './Reducers';
import QuestionsListContainer from './Components/QuestionsListContainer';
import QuestionContainer from './Components/QuestionContainer';

const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

class App extends Component {
constructor(props){
  super(props);
  this.state={
    categories: ["Kategori 1","Kategori 2","Kategori 3","Kategori 4",]
  }
}




/*fetchData(){
  const url = "https://5adf192bbf932f0014d11b7c.mockapi.io/kategorier";
axios.get(url)
.then(response => this.setState({data: response.data}))
}
componentDidMount(){
  this.props.fetchPost();
}
*/

  render() {

   /* const postItem = this.props.posts.map(
      post => (
          <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              </div>
      ));*/
    
    return (
        <Provider store={store}>
       <BrowserRouter>
      <div className="App">
        <Header />
        <Sidebar categories={this.state.categories} />
        <div className="Content" >

        <Route exact path="/" render={() => <h2>Dette er forside som kanskje skal vise siste poster.</h2>}/>
        {this.state.categories.map(
          (c, key) => {
            return <Route key={key} exact path={"/"+c.split(' ').join('_')} render={(props) => <QuestionsListContainer activeCategory={key}  {...props} />}/>
               
          }
        )}

      
        <Route path="/:categoryid/:questionid" render={(props) => <QuestionContainer data={this.state.data} {...props} />}/>
        </div>
      </div>
      </BrowserRouter>
    </Provider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    	actions: dispatch
    };
} 

function mapStateToProps(state) { 
  return {
    	data: state
    }; 
} 

export default connect( 
  mapStateToProps, mapDispatchToProps
)(App);