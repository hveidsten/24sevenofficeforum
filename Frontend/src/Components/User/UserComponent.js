import React, {Fragment} from 'react';
import {Button} from '../CommonStyledComponents';

const UserComponent = ({user, onclick, userLoggedin}) => {
    return(
        <Fragment>
            <h2>{user.userName}</h2>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>E-mail: {user.email}</p>
            <p>Telephone: {user.phone}</p>
            {userLoggedin? <Button onClick={onclick} color="#224477">Edit profile</Button>:""}
        </Fragment>
    );
}

export default UserComponent;