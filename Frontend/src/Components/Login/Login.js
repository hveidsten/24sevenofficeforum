import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, userSignIn } from '../../Actions/userActions';

class Login extends Component {
    constructor(props){
        super(props);
        this.userSelected = this.userSelected.bind(this);
    }
    componentDidMount() {
        this.props.fetchUsers();
    }

userSelected(id){
    this.props.userSignIn(id) 
    this.props.history.goBack();

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

                </Fragment>
            );
        } else {
            return (<h2>Please wait...</h2>)
        }
    }
}



const mapStateToProps = state => (
    {
        users: state.user.allUsers
    }
);

export default connect(mapStateToProps, { fetchUsers, userSignIn })(Login);