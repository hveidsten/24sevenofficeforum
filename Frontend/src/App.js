import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import { Header } from './Components/Header/Header';
import Home from './Components/Home/HomeContainer';
import Sidebar from './Components/Sidebar/Sidebar';
import NewQuestionContainer from './Components/NewQuestion/NewQuestionContainer';

import QuestionsList from './Components/QuestionList/QuestionsList';
import SingleQuestion from './Components/SingleQuestion/SingleQuestion'

import { fetchAllCategories, fetchSingleCategory } from './Actions/categoryActions';


class App extends Component {

  componentDidMount() {
    this.props.fetchAllCategories();
  }


  render() {
    return (
      <BrowserRouter>

        <div className="App">
          <Header />
          <Sidebar />
          <div className="Content" >
            <Switch>
              <Route exact path="/" component={Home} />

              {this.props.categories && this.props.categories.map(
                (c, key) => {
                  return <Route key={key} exact path={"/" + c.categoryName.replace(' ', '_')}
                    render={(props) => <QuestionsList activeCategory={c.id}  {...props} />} />
                }
              )
              }

              <Route exact path="/sok/:kat/:searchQuery" component={QuestionsList} />
              <Route exact path="/:categoryid/:questionid" component={SingleQuestion} />
              <Route exact path="/new_question" component={NewQuestionContainer} />
              <Route exact path="/edit_question" component={NewQuestionContainer} />

            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }

}

function mapStateToProps(state) {

  return {
    categories: state.category.allCategories
  };

}

export default connect(
  mapStateToProps, { fetchSingleCategory, fetchAllCategories }
)(App);