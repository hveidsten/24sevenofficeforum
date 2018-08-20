import React, {Fragment} from 'react';
import {Button} from '../CommonStyledComponents';

const UserComponent = ({user}) => {
    console.log(this.props);
    return(
        <Fragment>
            <h2>{user.userName}</h2>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>E-mail: {user.email}</p>
            <p>Telephone: {user.phone}</p>
            {user.loggedInId===user.userId? <Button onclick={() => alert("Kommer!")} color="#224477">Edit profile</Button>:""}
        </Fragment>
    );
}

export default UserComponent;