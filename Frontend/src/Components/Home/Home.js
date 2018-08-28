import React, { Component } from 'react';
import { HomeComponent } from './HomeComponent';
import { connect } from 'react-redux';
import { fetchSingleCategory } from '../../Actions/categoryActions';
import { fetchQuestions } from '../../Actions/questionActions';

class Home extends Component {

    componentDidMount() {
        this.props.fetchQuestions();
        this.props.fetchSingleCategory(-1);
    }

    render() {
        return (
            <HomeComponent
                posts={this.props.posts}
                categories={this.props.categories}
                user={this.props.user}
            />
        );
    }
}

const mapStateToProps = state => ({
    posts: state.questions.allQuestionsInCategory,
    categories: state.category.allCategories,
    user: state.user
});


export default connect(mapStateToProps, { fetchQuestions, fetchSingleCategory })(Home);