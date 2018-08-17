import React, {Fragment} from 'react';

const UserComponent = ({user}) => {
    return(
        <Fragment>
            <h2>{user.userName}</h2>
        </Fragment>
    );    
}
export default UserComponent;