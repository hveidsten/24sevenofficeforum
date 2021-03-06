import React, { Component, Fragment } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AddAnswer from './AddAnswer';
import AnswerComponent from './AnswerComponent';
import { fetchSingleCategory } from '../../Actions/categoryActions';
import { Button } from '../CommonComponents/Button';
import QuestionComponent from './QuestionComponent';
import PageChanger from '../QuestionList/PageChanger';
import SortDropdown from './SortDropdown';
import { fetchQuestion, deleteQuestion, editQuestion } from '../../Actions/questionActions';
import { fetchAnswers, deleteAnswer, editAnswer } from '../../Actions/answerActions';

class SingleQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showQuestionForm: false,
            Deleted: false,
            edit: false,
            pageNumber: 1,
            maxPageNumber: 1,
            sortOrder: ""
        }

        this.handleVote = this.handleVote.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.editPostRedirect = this.editPostRedirect.bind(this);
        this.toggleQuestionform = this.toggleQuestionform.bind(this);
        this.changePage = this.changePage.bind(this);
        this.setMaxPageNumber = this.setMaxPageNumber.bind(this);
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
            this.props.fetchAnswers(e.payload.id, this.state.pageNumber, this.state.sortOrder)
        ).then(this.setMaxPageNumber);

    }

    setMaxPageNumber() {

        let maxPage = this.props.question.answerCount / 10;
        maxPage = Number.isInteger(maxPage) ? maxPage : Math.ceil(maxPage);

        this.setState({ maxPageNumber: maxPage > 1 ? maxPage : 1 });
    }


    handleVote(up, id, answer) {
        if (answer) {
            const vote = answer;
            up === 1 ? vote.upvote++ : vote.upvote--;
            this.props.editAnswer(vote);
        } else {
            let vote = this.props.question;
            up === 1 ? vote.upvote++ : vote.upvote--;
            this.props.editQuestion(vote);
        }
    }

    deleteQuestion() {
        if (window.confirm("Are you sure you want to delete this question?")) {
            this.props.deleteQuestion(this.props.question.id);
            this.setState({ Deleted: true });
        }
    }

    onchange(e) {
        this.setState({ sortOrder: e.target.value });
        this.props.fetchAnswers(this.props.match.params.questionid, this.state.pageNumber, e.target.value);
        this.setState({
            pageNumber: 1
        });
    }


    changePage(newPage) {
        if (newPage > 0 && newPage <= this.state.maxPageNumber) {
            this.setState({
                pageNumber: newPage
            });
            this.props.fetchAnswers(this.props.match.params.questionid, newPage, this.state.sortOrder);
            this.scrollToTop();
        }
    }

    scrollToTop = () => {
        this.scrollToPoint.scrollIntoView();
    }


    editPostRedirect() {
        this.props.question.hasBeenPosted = false;
        this.props.history.push("../edit_question");
    }


    render() {

        if (this.state.Deleted) {
            return (
                <Redirect to={"../" + this.props.match.params.categoryid} />
            );
        }


        if (this.props.question === undefined) { return <h2>Loading</h2>; }

        else {
            return (
                <Fragment>
                    <span ref={(el) => { this.scrollToPoint = el; }} />

                    {this.state.edit && <Redirect to="../edit_question" />}

                    <QuestionComponent
                        user={this.props.user}
                        question={this.props.question}
                        handleVote={this.handleVote}
                        categoryId={this.props.match.params.categoryid}
                        deleteQuestion={this.deleteQuestion}
                        editPostRedirect={this.editPostRedirect}
                        historyPush={this.props.history.push} />

                    <SortDropdown onchange={(e) => this.onchange(e)} />

                    {this.props.answers && this.props.answers.map((a, key) =>
                        <AnswerComponent answer={a}
                            deleteAnswer={this.props.deleteAnswer}
                            editAnswer={this.props.editAnswer}
                            handleVote={this.handleVote}
                            user={this.props.user && this.props.user.loggedInUser}
                            categoryId={this.props.match.params.categoryid}
                            toggleQuestionform={() => this.toggleQuestionform(a)}
                            key={key}
                            historyPush={this.props.history.push}
                        />)}


                    {this.props.user.loggedInUser && <Button color="#49bd39" onclick={this.toggleQuestionform} text="New answer" />}

                    <PageChanger onclick={(a) => this.changePage(a)}
                        pageNumber={this.state.pageNumber}
                        maxPageNumber={this.state.maxPageNumber} />

                    {this.state.showQuestionForm && (<AddAnswer answer={this.state.answer} hideForm={this.toggleQuestionform} />)}

                </Fragment>

            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        fetchSingleCategory: (a) => dispatch(fetchSingleCategory(a)),

        fetchQuestion: (id) => dispatch(fetchQuestion(id)),
        deleteQuestion: (id) => dispatch(deleteQuestion(id)),
        editQuestion: (id) => dispatch(editQuestion(id)),

        fetchAnswers: (questionId, pageNumber, sortOrder) => dispatch(fetchAnswers(questionId, pageNumber, sortOrder)),
        deleteAnswer: (id) => dispatch(deleteAnswer(id)),
        editAnswer: (id) => dispatch(editAnswer(id))


    };
};

const mapStateToProps = state => (
    {
        question: state.questions.activeQuestion,
        user: state.user,
        category: state.category.currentCategory,
        answers: state.answers
    }
);


export default connect(mapStateToProps, mapDispatchToProps)(SingleQuestion);
