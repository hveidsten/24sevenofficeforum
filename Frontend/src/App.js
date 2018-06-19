import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect} from 'react-redux';
import './App.css';

import {Header} from './Components/Header/Header';
import {Home} from './Components/Home/HomeComponent';
import SidebarContainer from './Components/Sidebar/SidebarContainer';
import NewQuestionContainer from './Components/NewQuestion/NewQuestionContainer';

import QuestionsListContainer from './Components/QuestionList/QuestionsListContainer';
import QuestionContainer from './Components/SingleQuestion/QuestionContainer';

import {fetchAllCategories, fetchSingleCategory} from './Actions/categoryActions';


class App extends Component {

componentDidMount(){
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
        <Switch>
<Route exact path="/" render={() =>  {this.props.fetchSingleCategory(0); return <h2>Dette er forside som kanskje skal vise siste poster.</h2>}}/>

{this.props.categories.map(
  (c, key) => {
    return <Route key={key} exact path={"/"+c.categoryName.replace(' ','_')} 
    render={(props) => <QuestionsListContainer activeCategory={c.id}  {...props} />}/>
    }
  )
}

<Route exact path="/sok/:kat/:searchQuery"  component={QuestionsListContainer}/>
<Route exact path="/:categoryid/:questionid" component={QuestionContainer}/>
<Route exact path="/nytt_sporsmal" component={NewQuestionContainer} />
</Switch>
</div>
      </div>
      </BrowserRouter>
    );
  }else{return <h3>Vent</h3>}
  }

}

function mapStateToProps(state) { 

  return {
    	categories: state.category.allCategories
    }; 
    
} 

export default connect( 
  mapStateToProps, {fetchSingleCategory,fetchAllCategories}
)(App);