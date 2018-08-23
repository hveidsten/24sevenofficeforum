import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import Home from './Components/Home/Home';
import NewQuestion from './Components/NewQuestion/NewQuestion';
import QuestionList from './Components/QuestionList/QuestionList';
import SingleQuestion from './Components/SingleQuestion/SingleQuestion';
import SearchResults from './Components/SearchResults/SearchResults';
import User from './Components/User/User';


import { fetchAllCategories, fetchSingleCategory } from './Actions/categoryActions';


class App extends Component {
  componentDidMount() {
    this.props.fetchAllCategories();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="pageWrapper">
          <Header />
          <Sidebar />
          <div className="mainContent">
            <Switch>
              <Route exact path="/" component={Home} />

              {this.props.categories && this.props.categories.map(
                (c, key) => {
                  return <Route key={key}
                    exact path={"/" + c.categoryName.replace(' ', '_')}
                    render={(props) => <QuestionList activeCategory={c.id}  {...props} />} />
                })
              }
              <Route exact path="/user/:userId" component={User} />
              <Route exact path="/sok/:kat/:searchQuery" component={SearchResults} />
              <Route exact path="/:categoryid/:questionid" component={SingleQuestion} />
              <Route exact path="/new_question" component={NewQuestion} />
              <Route exact path="/edit_question" component={NewQuestion} />
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