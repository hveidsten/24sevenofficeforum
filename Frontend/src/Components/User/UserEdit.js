import React, { Fragment } from 'react';
import { Button, InputWrapper } from '../CommonStyledComponents';


const UserEdit = ({ user, onclick }) => {
    return (
        <Fragment>
            <h2>Edit user</h2>
            <InputWrapper>
            <form>
                
                <label>Firstname:
            <input name="firstName" defaultValue={user.firstName} />
                    <br />
                </label>

                <label>Lastname:
            <input name="lastName" defaultValue={user.lastName} />
                    <br />
                </label>

                <label>E-Mail:
            <input name="mail" defaultValue={user.email} />
                    <br />
                </label>

                <label>Telephone:
            <input name="phone" defaultValue={user.phone} />
                    <br />
                </label>
                <Button onClick={onclick} color="#224477">Save</Button>
            </form>
            </InputWrapper>
        </Fragment>
    );
}

export default UserEdit;