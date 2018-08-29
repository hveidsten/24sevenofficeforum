import React, {Fragment} from 'react';
import {Button} from '../CommonComponents/Button';

const UserComponent = ({user, onclick, userLoggedin}) => {
    return(
        <Fragment>
            <h2>{user.userName}</h2>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>E-mail: {user.email}</p>
            <p>Telephone: {user.phone}</p>
            <p>Company: {user.company}</p>
            {userLoggedin? 
            <Button onclick={onclick} color="#224477" text="Edit profile"/>:
            <Button onclick={() => {alert("Not yet implemented.")}} color="#224477" text="Message"/>}
        </Fragment>
    );
}

export default UserComponent;