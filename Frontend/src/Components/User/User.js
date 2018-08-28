import React, { Component, Fragment } from 'react';
import UserEdit from './UserEdit';
import UserComponent from './UserComponent';
import { connect } from 'react-redux';
import { userSignIn, fetchUser } from '../../Actions/userActions';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = { edit: false }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.checkIfUserIsLoggedIn = this.checkIfUserIsLoggedIn.bind(this);
    }

    componentWillMount() {
        this.props.fetchUser(this.props.match.params.userId);
        this.props.userSignIn(1);
    }

    toggleEdit(){
        this.setState({edit: !this.state.edit});
    }

    checkIfUserIsLoggedIn(){
        return this.props.loggedInUser && this.props.displayedUser.userId === this.props.loggedInUser.userId;
    }

    render() {
        if (this.props.displayedUser) {
            return (
                <Fragment>
                   { this.state.edit? <UserEdit user={this.props.loggedInUser} onclick={this.toggleEdit} />:<UserComponent user={this.props.displayedUser} userLoggedin={this.checkIfUserIsLoggedIn()} onclick={this.toggleEdit} />}
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
        fetchUser: (id) => dispatch(fetchUser(id))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(User);