import React, { Component } from 'react';

import { userSignIn, userSignOut, fetchUser } from '../../Actions/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class UserLoginHeader extends Component {
    constructor(props) {
        super(props);
        this.userNameOnclick = this.userNameOnclick.bind(this);
    }

    userNameOnclick() {
        this.props.fetchUser(this.props.user.loggedInUser.id);
        this.props.history.push('../../user/' + this.props.user.loggedInUser.id);
    }

    render() {
        return (
            <div className="userLoginHeader">
                {this.props.user && this.props.user.loggedInUser ?
                    <p>
                        <span onClick={this.userNameOnclick}>
                            Hello {this.props.user.loggedInUser.firstName}
                        </span>
                        <span onClick={this.props.userSignOut}>-log out </span>
                    </p> :

                    <div>
                        <a onClick={() => this.props.history.push('../../login/')}>
                            Sign in or Sign up</a>

                    </div>
                }
            </div>
        );
    }
}



const mapStateToProps = state => ({

    user: state.user
});

export default withRouter(connect(
    mapStateToProps, { userSignIn, fetchUser, userSignOut }
)(UserLoginHeader));