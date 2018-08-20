import React, { Component } from 'react';

import { userSignIn } from '../../Actions/userActions';
import { connect } from 'react-redux';

class UserLoginHeader extends Component {

    render() {
        return (
            <div className="userLoginHeader">
                {this.props.user && this.props.user.loggedInId != 0 ?
                    <p>Hello {this.props.user.userName}   <span onClick={() => this.props.userSignIn(0)}>-log out </span></p> :
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

export default connect(
    mapStateToProps, { userSignIn }
)(UserLoginHeader);