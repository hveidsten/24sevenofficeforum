import React, { Component, Fragment } from 'react';
import UserEdit from './UserEdit';
import UserComponent from './UserComponent';
import { connect } from 'react-redux';
import { userSignIn, fetchUser, editUser } from '../../Actions/userActions';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = { edit: false }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.checkIfUserIsLoggedIn = this.checkIfUserIsLoggedIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId);

    }

    toggleEdit() {
        this.setState({ edit: !this.state.edit, user: this.props.loggedInUser });

    }

    checkIfUserIsLoggedIn() {
        return this.props.loggedInUser && this.props.displayedUser.userId === this.props.loggedInUser.userId;
    }

    handleSubmit() {
        console.log(this.state.user);
        this.props.editUser(this.state.user);
    }

    handleChange(event) {

        this.setState({ user: { ...this.state.user, [event.target.name]: event.target.value } });
        console.log(this.state);
    }

    render() {

        if (this.props.displayedUser) {
            return (
                <Fragment>
                    {this.state.edit ?
                        <UserEdit
                            user={this.props.loggedInUser}
                            onclick={this.toggleEdit}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit} /> :
                        <UserComponent
                            user={this.props.displayedUser}
                            userLoggedin={this.checkIfUserIsLoggedIn()}
                            onclick={this.toggleEdit}
                        />}
                </Fragment>
            );
        } else {
            return <h2>vent</h2>
        }
    }
}

const mapStateToProps = state => (
    {
        displayedUser: state.user.displayedUser,
        loggedInUser: state.user.loggedInUser
    }
);

const mapDispatchToProps = (dispatch) => {

    return {
        userSignIn: (id) => dispatch(userSignIn(id)),
        fetchUser: (id) => dispatch(fetchUser(id)),
        editUser: (data) => dispatch(editUser(data))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(User);