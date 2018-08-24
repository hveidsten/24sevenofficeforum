import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetch } from '../../Actions/postActions';
import { fetchSingleCategory } from '../../Actions/categoryActions';
import QuestionInList from '../QuestionList/QuestionInList';
import PageChanger from '../QuestionList/PageChanger';
import SortDropdown from '../SingleQuestion/SortDropdown';
import { fetchQuestions } from '../../Actions/questionActions';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pageNumber: 1,
      sortOrder:""
     }
    this.onchange = this.onchange.bind(this);
    this.changePage = this.changePage.bind(this);
    this.myRef = React.createRef();
  }


  componentDidMount() {
    this.props.fetchQuestions(0,this.state.pageNumber,this.state.sortOrder,this.props.match.params.searchQuery);
  }


  onchange(e) {
    this.props.fetchQuestions(0,this.state.pageNumber,e.target.value,this.props.match.params.searchQuery);
    this.setState({
      pageNumber: 1
    });
  }

  changePage(newPage) {
    if (newPage > 0) {
      this.setState({
        pageNumber: newPage
      });
      this.props.fetchQuestions(0,newPage,this.state.sortOrder,this.props.match.params.searchQuery);
      this.scrollToTop();
    }
  }

  scrollToTop = () => {
    this.scrollToPoint.scrollIntoView();
  }


  render() {
    if (!this.props.questions) { return <h2>Loading</h2>; }
    else {
      return (
        <Fragment  >
          <span ref={(el) => { this.scrollToPoint = el; }} />

          <h2>{"Results for " + this.props.match.params.searchQuery}</h2>

          <SortDropdown onchange={(e) => this.onchange(e)} />

          {this.props.questions.map(
            (c, key) => {
              return (
                <QuestionInList linkToQuestion={"../../" + this.props.categories.find(a => a.id === c.categoryId).categoryName.replace(' ', '_') + "/" + c.id} question={c} key={key} />
              )
            }
          )}
          <PageChanger onclick={(a) => this.changePage(a)} pageNumber={this.state.pageNumber} />
        </Fragment>
      );
    }

  }
}

const mapStateToProps = state => ({
  category: state.category.currentCategory,
  categories: state.category.allCategories,
  questions: state.questions.allQuestionsInCategory,
  user: state.user
});

export default connect(mapStateToProps, { fetchSingleCategory, fetch, fetchQuestions })(SearchResults);
