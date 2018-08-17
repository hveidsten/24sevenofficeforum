import React, {Component, Fragment} from 'react';
import UserEdit from './UserEdit';
import UserComponent from './UserComponent';

class User extends Component{

    render(){
        const editable = false;
        return(
            <Fragment>
                {editable? <UserEdit /> : <UserComponent />}

            </Fragment>
        );
    }
}

export default User;