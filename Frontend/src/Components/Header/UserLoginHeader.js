import React, { Component } from 'react';

import { userIsLoggedIn } from '../../Actions/userActions';
import { connect } from 'react-redux';

class UserLoginHeader extends Component {

    render() {
        return (
            <div className="userLoginHeader">
                {this.props.user && this.props.user.isLoggedIn === true ?
                    <p>Hello {this.props.user.userName}   <span onClick={() => this.props.userIsLoggedIn(0)}>-log out </span></p> :
                    <div>
                        <a onClick={() => this.props.userIsLoggedIn(1)}>Sign in </a>
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
    mapStateToProps, { userIsLoggedIn }
)(UserLoginHeader);