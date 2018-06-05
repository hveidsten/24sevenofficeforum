import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect} from 'react-redux';
import './App.css';

import Sidebar from './Components/Sidebar';
import {Header} from './Components/PresentationalComponents';
import NewQuestion from './Containers/NewQuestion.js';

import QuestionsListContainer from './Components/QuestionsListContainer';
import QuestionContainer from './Components/QuestionContainer';

import {fetchAllCategories} from './Actions/categoryActions';
import SidebarContainer from './Containers/SidebarContainer';
import MainContentContainer from './Containers/MainContentContainer';


class App extends Component {

componentWillMount(){
 this.props.fetchAllCategories();
}


  render() {
if(this.props.categories){

    return (
      
       <BrowserRouter>
      <div className="App">
        <Header />
        <SidebarContainer />
        <div className="Content" >
       
<Route exact path="/" render={() => <h2>Dette er forside som kanskje skal vise siste poster.</h2>}/>
{this.props.categories.map(
  (c, key) => {
    return <Route key={key} exact path={"/"+c.categoryName.split(' ').join('_')} render={(props) => <QuestionsListContainer activeCategory={c.id}  {...props} />}/>
    
  }
)}

<Route exact path="/sok/:kat/:searchQuery/" render={(props) => <QuestionsListContainer  {...props} />}/>
<Route exact path="/:categoryid/:questionid" render={(props) => <QuestionContainer {...props} />}/>
<Route exact path="/sok/:kat/:searchQuery/:questionid" render={(props) => <QuestionContainer {...props} />}/>
<Route exact path="/nytt_sporsmal" render={(props) => <NewQuestion {...props} />}/>

</div>
      </div>
      </BrowserRouter>
 
    );
  }else{return <h3>Vent</h3>}
  }

}


function mapDispatchToProps(dispatch) {
  return { 
    	actions: dispatch
    };
} 

function mapStateToProps(state) { 
  console.log(state);
  return {
    	categories: state.category.allCategories
    }; 
    
} 

export default connect( 
  mapStateToProps, {fetchAllCategories}
)(App);