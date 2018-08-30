import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, userSignIn, createUser } from '../../Actions/userActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.userSelected = this.userSelected.bind(this);
        this.createUser = this.createUser.bind(this);
    }
    componentDidMount() {
        this.props.fetchUsers();
    }

    userSelected(id) {
        this.props.userSignIn(id)
        this.props.history.goBack();
    }

    createUser() {
        this.props.createUser({ "userName": "", "email": "", "firstName": "Please click edit.", "lastName": " ", "company": " ", "userVote": 1, "userRole": "a", "userClaim": "a" });


    }

    render() {
        if (this.props.users) {
            return (

                <Fragment>
                    <h2>Absolutly secure login:</h2>
                    <p>Please choose a user:
                 <select onChange={(e) => { this.userSelected(e.target.value) }}>
                            <option>Select user</option>
                            {this.props.users.map(
                                (u, i) => {
                                    return (<option value={u.id} key={i}>
                                        {u.firstName}
                                    </option>);
                                }
                            )}

                        </select></p>
                    <button onClick={this.createUser}>Create new user</button>
                </Fragment>
            );
        } else {
            return (<h2>Please wait...</h2>)
        }
    }
}


const mapStateToProps = state => (
    {
        users: state.user.allUsers,
        user: state.user.loggedInUser
    }
);

export default connect(mapStateToProps, { fetchUsers, userSignIn, createUser })(Login);