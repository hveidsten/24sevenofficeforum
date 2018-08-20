import React, { Component } from 'react';
import { HomeComponent } from './HomeComponent';
import { connect } from 'react-redux';
import { fetch } from '../../Actions/postActions';
import { fetchSingleCategory } from '../../Actions/categoryActions';

class Home extends Component {

    componentDidMount() {
        this.props.fetch("questions", "FETCH_POSTS");
        this.props.fetchSingleCategory(-1);
    }

    render() {
        return (
            <HomeComponent posts={this.props.posts} categories={this.props.categories} userLoggedIn={this.props.user.loggedInId !==0} userName={this.props.user.userName} />
        );


    }
}

const mapStateToProps = state => ({
    posts: state.posts.allQuestionsInCategory,
    categories: state.category.allCategories,
    user: state.user
});


export default connect(mapStateToProps, { fetch, fetchSingleCategory })(Home);