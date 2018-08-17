import React, {Component, Fragment} from 'react';

class User extends Component{

    render(){
        return(
            <Fragment>
            <h2>User</h2>
            <h3>id: {this.props.match.params.userId}</h3>
            </Fragment>
        );
    }
}

export default User;