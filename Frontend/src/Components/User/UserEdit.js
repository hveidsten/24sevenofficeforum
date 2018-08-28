import React, { Fragment } from 'react';
import { InputWrapper } from '../CommonStyledComponents';
import {Button} from '../CommonComponents/Button';


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
               
            </form>
           
            </InputWrapper>
            <Button onclick={onclick} color="#224477" text="Save" />
            <Button onclick={onclick} color="#224477" text="Back" />
        </Fragment>
    );
}

export default UserEdit;