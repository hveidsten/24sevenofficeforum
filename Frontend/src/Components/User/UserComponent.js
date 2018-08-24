import React, {Fragment} from 'react';
import {Button} from '../CommonStyledComponents';

const UserComponent = ({user, onclick}) => {
    return(
        <Fragment>
            <h2>{user.userName}</h2>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>E-mail: {user.email}</p>
            <p>Telephone: {user.phone}</p>
            {user.loggedInId===user.userId? <Button onClick={onclick} color="#224477">Edit profile</Button>:""}
        </Fragment>
    );
}

export default UserComponent;