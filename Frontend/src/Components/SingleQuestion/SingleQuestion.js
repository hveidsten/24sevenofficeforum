import React, { Component, Fragment } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AddAnswer from './AddAnswer';
import AnswerComponent from './AnswerComponent';
import { editPost, deletePost, deleteAnswer, editAnswer, fetchPost, fetch, FETCH_ANSWERS } from '../../Actions/postActions';
import { fetchSingleCategory } from '../../Actions/categoryActions';
import { Button } from '../CommonStyledComponents';
import QuestionComponent from './QuestionComponent';
import PageChanger from '../QuestionList/PageChanger';
import SortDropdown from './SortDropdown';

class SingleQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showQuestionForm: false,
            Deleted: false,
            edit: false,
            pageNumber: 1
        }

        this.handleVote = this.handleVote.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.editPostRedirect = this.editPostRedirect.bind(this);
        this.toggleQuestionform = this.toggleQuestionform.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    toggleQuestionform(a) {
        this.setState({
            showQuestionForm: !this.state.showQuestionForm,
            answer: a,
        });

    }

    componentDidMount() {
        this.props.fetchPost(`${this.props.match.params.questionid}`).then(e =>
            this.props.fetchSingleCategory(e.payload.categoryId) |
            this.props.fetch(`answers/?questionId=${e.payload.id}`, "FETCH_ANSWERS")
        );
    }


    handleVote(up, id, answer) {
        if (answer) {
            const vote = answer;
            up === 1 ? vote.upvote++ : vote.upvote--;
            this.props.editAnswer(vote);
        } else {
            let vote = this.props.post;
            up === 1 ? vote.upvote++ : vote.upvote--;
            this.props.editPost(vote);
        }
    }

    deletePost() {
        if (window.confirm("Are you sure you want to delete this question?")) {
            this.props.deletePost(this.props.post.id);
            this.setState({ Deleted: true });
        }
    }

    onchange(e) {
        this.props.fetch(`answers/?questionId=${this.props.match.params.questionid}&sortOrder=${e.target.value}`, FETCH_ANSWERS);
        this.setState({
            pageNumber: 1
        });
    }


    changePage(newPage) {
        if (newPage > 0) {
            this.setState({
                pageNumber: newPage
            });
            this.props.fetch(`answers/?questionId=${this.props.post.id}&page=${newPage}`, "FETCH_ANSWERS");
            this.scrollToTop();
        }
    }

    scrollToTop = () => {
        this.scrollToPoint.scrollIntoView();
    }


    editPostRedirect() {
        this.props.post.hasBeenPosted = false;
        this.props.history.push("../edit_question");
    }


    render() {

        if (this.state.Deleted) {
            return (
                <Redirect to={"../" + this.props.match.params.categoryid} />
            );
        }


        if (this.props.post === undefined) { return <h2>Vent</h2>; }

        else {
            return (
                <Fragment>
                    <span ref={(el) => { this.scrollToPoint = el; }} />

                    {this.state.edit && <Redirect to="../edit_question" />}

                    <QuestionComponent
                        user={this.props.user}
                        question={this.props.post}
                        handleVote={this.handleVote}
                        categoryId={this.props.match.params.categoryid}
                        deletePost={this.deletePost}
                        editPostRedirect={this.editPostRedirect} />

                    <SortDropdown onchange={(e) => this.onchange(e)} />

                    {this.props.post.answer.map((a, key) =>
                        <AnswerComponent answer={a}
                            deleteAnswer={this.props.deleteAnswer}
                            editAnswer={this.props.editAnswer}
                            handleVote={this.handleVote}
                            user={this.props.user}
                            categoryId={this.props.match.params.categoryid}
                            toggleQuestionform={() => this.toggleQuestionform(a)}
                            key={key} />)}

                    {this.props.user.isLoggedIn && (<div>
                        {this.state.showQuestionForm === false ?
                            <Button color="#49bd39" onClick={this.toggleQuestionform}>New answer</Button> :
                            <Button color="#f04b4b" onClick={this.toggleQuestionform}>Close</Button>
                        }
                    </div>)}
                    <PageChanger onclick={(a) => this.changePage(a)} pageNumber={this.state.pageNumber} />
                    {this.state.showQuestionForm && (<AddAnswer answer={this.state.answer} hideForm={this.toggleQuestionform} />)}

                </Fragment>

            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchPost: (a) => dispatch(fetchPost(a)),
        editPost: (a) => dispatch(editPost(a)),
        deletePost: (a) => dispatch(deletePost(a)),
        deleteAnswer: (a) => dispatch(deleteAnswer(a)),
        editAnswer: (a) => dispatch(editAnswer(a)),
        fetchSingleCategory: (a) => dispatch(fetchSingleCategory(a)),
        fetch: (path, type) => dispatch(fetch(path, type))
    };
};

const mapStateToProps = state => (
    {
        post: state.posts.activeQuestion,
        user: state.user,
        category: state.category.currentCategory
    }
);


export default connect(mapStateToProps, mapDispatchToProps)(SingleQuestion);