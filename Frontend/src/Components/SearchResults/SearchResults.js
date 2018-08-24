import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetch } from '../../Actions/postActions';
import { fetchSingleCategory } from '../../Actions/categoryActions';
import QuestionInList from '../QuestionList/QuestionInList';
import PageChanger from '../QuestionList/PageChanger';
import SortDropdown from '../SingleQuestion/SortDropdown';
import { fetchQuestions } from '../../Actions/questionActions';

class QuestionsList extends Component {
  constructor(props) {
    super(props);
    this.state = { pageNumber: 1 }
    this.onchange = this.onchange.bind(this);
    this.changePage = this.changePage.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.myRef = React.createRef();
  }

  fetchPosts(pageNumber) {
    this.props.fetch(`search?id=${this.props.match.params.searchQuery}`, "FETCH_POSTS");

  }

  componentDidMount() {
    this.fetchPosts(this.state.pageNumber);
  }


  onchange(e) {
    this.props.fetchQuestions(this.props.activeCategory, 1, e.target.value);
    this.setState({
      pageNumber: 1
    });
  }

  changePage(newPage) {
    if (newPage > 0) {
      this.setState({
        pageNumber: newPage
      });
      this.fetchPosts(newPage);
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
  questions: state.posts.allQuestionsInCategory,
  user: state.user
});

export default connect(mapStateToProps, { fetchSingleCategory, fetch, fetchQuestions })(QuestionsList);
