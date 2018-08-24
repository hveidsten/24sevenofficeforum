import React, { Component, Fragment } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AddAnswer from './AddAnswer';
import AnswerComponent from './AnswerComponent';
import { editPost, deletePost, deleteAnswer, editAnswer, fetchPost, fetch } from '../../Actions/postActions';
import { fetchSingleCategory } from '../../Actions/categoryActions';
import { Button } from '../CommonComponents/Button';
import QuestionComponent from './QuestionComponent';
import PageChanger from '../QuestionList/PageChanger';
import SortDropdown from './SortDropdown';
import {fetchQuestion} from '../../Actions/questionActions';
import {fetchAnswers} from '../../Actions/answerActions';

class SingleQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showQuestionForm: false,
            Deleted: false,
            edit: false,
            pageNumber: 1,
            sortOrder: ""
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
            answer: a
        });
    }
    
    componentDidMount() {
        this.props.fetchQuestion(this.props.match.params.questionid).then(e =>
            this.props.fetchSingleCategory(e.payload.categoryId) |
            this.props.fetchAnswers(e.payload.id, this.state.pageNumber,this.state.sortOrder)
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
        this.setState({sortOrder: e.target.value});
        this.props.fetchAnswers(this.props.match.params.questionid, this.state.pageNumber,e.target.value);
        this.setState({
            pageNumber: 1
        });
    }


    changePage(newPage) {
        if (newPage > 0) {
            this.setState({
                pageNumber: newPage
            });
            this.props.fetchAnswers(this.props.match.params.questionid, newPage,this.state.sortOrder);
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

                    {this.props.answers && this.props.answers.map((a, key) =>
                        <AnswerComponent answer={a}
                            deleteAnswer={this.props.deleteAnswer}
                            editAnswer={this.props.editAnswer}
                            handleVote={this.handleVote}
                            user={this.props.user}
                            categoryId={this.props.match.params.categoryid}
                            toggleQuestionform={() => this.toggleQuestionform(a)}
                            key={key} />)}


                    <Button color="#49bd39" onclick={this.toggleQuestionform} text="New answer" />
                    
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
        fetch: (path, type) => dispatch(fetch(path, type)),

        fetchAnswers: (questionId, pageNumber, sortOrder) => dispatch(fetchAnswers(questionId, pageNumber, sortOrder)),
        fetchQuestion: (id) => dispatch(fetchQuestion(id))
    };
};

const mapStateToProps = state => (
    {
        post: state.questions.activeQuestion,
        user: state.user,
        category: state.category.currentCategory,
        answers : state.answers
    }
);


export default connect(mapStateToProps, mapDispatchToProps)(SingleQuestion);
