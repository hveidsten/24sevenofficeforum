import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSingleCategory } from '../../Actions/categoryActions';
import QuestionInList from './QuestionInList';
import { Button } from '../CommonComponents/Button';
import PageChanger from './PageChanger';
import SortDropdown from '../SingleQuestion/SortDropdown';
import { fetchQuestions } from '../../Actions/questionActions';

class QuestionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      numberOfPages: 1,
      maxPageNumber: 1,
      sortOrder: ""
    }

    this.onchange = this.onchange.bind(this);
    this.changePage = this.changePage.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.myRef = React.createRef();
    this.setMaxPageNumber = this.setMaxPageNumber.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }


  fetchPosts(pageNumber) {
    this.props.fetchSingleCategory(this.props.activeCategory);
    this.props.fetchQuestions(this.props.activeCategory, pageNumber, this.state.sortOrder);

  }

  componentDidMount() {
    this.fetchPosts(this.state.pageNumber);
  }
  componentDidUpdate() {
    this.setMaxPageNumber();
  }

  onchange(e) {
    this.setState({ sortOrder: e.target.value });
    this.props.fetchQuestions(this.props.activeCategory, 1, e.target.value);
    this.setState({
      pageNumber: 1
    });
  }

  changePage(newPage) {
    if (newPage > 0 && newPage <= this.state.maxPageNumber) {
      this.setState({
        pageNumber: newPage
      });
      this.fetchPosts(newPage);
      this.scrollToTop();
    }
  }

  setMaxPageNumber() {
    let maxPage = this.props.category && this.props.category.questionCount / 10;
    console.log(maxPage);
    maxPage = Number.isInteger(maxPage) ? maxPage : Math.ceil(maxPage);

    this.setState({ maxPageNumber: maxPage });

    console.log(this.state.maxPageNumber);
  }

  scrollToTop = () => {
    this.scrollToPoint.scrollIntoView();
  }


  render() {
    if (!this.props.questions.allQuestionsInCategory) { return <h2>Loading</h2>; }
    else {

      return (
        <Fragment>
          <span ref={(el) => { this.scrollToPoint = el; }} />

          <h2>{this.props.category && this.props.category.categoryName} </h2>


          <SortDropdown onchange={(e) => this.onchange(e)} sortByAnswers />

          {this.props.questions.allQuestionsInCategory.map(
            (c, key) => {
              return (
                <QuestionInList linkToQuestion={"../../" + this.props.categories.find(a => a.id === c.categoryId).categoryName.replace(' ', '_') + "/" + c.id} question={c} key={key} />
              )
            }
          )}
          <PageChanger onclick={(a) => this.changePage(a)}
            pageNumber={this.state.pageNumber}
            maxPageNumber={this.state.maxPageNumber} />

          {this.props.user.loggedInUser && <Link to='./new_question'> <Button color="#49bd39" text="New question" /></Link>}
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  category: state.category.currentCategory,
  categories: state.category.allCategories,
  questions: state.questions,
  user: state.user
});

export default connect(mapStateToProps, { fetchSingleCategory, fetchQuestions })(QuestionsList);
