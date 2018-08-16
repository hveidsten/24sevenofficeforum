import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetch } from '../../Actions/postActions';
import { Link } from 'react-router-dom';
import { fetchSingleCategory } from '../../Actions/categoryActions';
import QuestionInList from './QuestionInList';
import { Button } from '../CommonStyledComponents';
import PageChanger from './PageChanger';
import SortDropdown from '../SingleQuestion/SortDropdown';

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
    if (this.props.match.params.searchQuery) {
      this.props.fetch(`search?id=${this.props.match.params.searchQuery}&page=${pageNumber}`, "FETCH_POSTS");
    } else {
      this.props.fetchSingleCategory(this.props.activeCategory);
      this.props.fetch(`questions/?categoryId=${this.props.activeCategory}&page=${pageNumber}`, "FETCH_POSTS");
    }
  }

  componentDidMount() {
    this.fetchPosts();
  }

  onchange(e) {
    this.props.fetch(`questions/?categoryId=${this.props.activeCategory}&sortOrder=${e.target.value}`, "FETCH_POSTS");
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
    if (!this.props.questions || !this.props.categories) { return <h2>Vent</h2>; }
    else {
      return (
        <Fragment  >
          <span ref={(el) => { this.scrollToPoint = el; }} />

          <h2>{this.props.match.params.searchQuery ? "Results for " + this.props.match.params.searchQuery : this.props.category && this.props.category.categoryName}</h2>

        

            <SortDropdown onchange={(e) => this.onchange(e)} />



          {this.props.questions.map(
            (c, key) => {
              return (
                <QuestionInList linkToQuestion={"../../" + this.props.categories.find(a => a.id === c.categoryId).categoryName.replace(' ', '_') + "/" + c.id} question={c} key={key} />
              )
            }
          )}
          <PageChanger onclick={(a) => this.changePage(a)} pageNumber={this.state.pageNumber} />
          {this.props.user.isLoggedIn ? <Link to='./new_question'> <Button color="#49bd39">New question</Button></Link> : ""}
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

export default connect(mapStateToProps, { fetch, fetchSingleCategory })(QuestionsList);
