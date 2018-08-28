import React, { Component } from 'react';

import { userSignIn } from '../../Actions/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class UserLoginHeader extends Component {

    render() {
        return (
            <div className="userLoginHeader">
                {this.props.user && this.props.user.loggedInUser ?
                    <p onClick={() => { this.props.history.push('../../user/' + this.props.user.loggedInUser.userId) }}>
                        Hello {this.props.user.loggedInUser.userName}

                        <span onClick={() => this.props.userSignIn(0)}>-log out </span>
                    </p> :

                    <div>
                        <a onClick={() => this.props.userSignIn(1)}>Sign in </a>
                        or
                        <a> Sign up</a>

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
    mapStateToProps, { userSignIn }
)(UserLoginHeader));