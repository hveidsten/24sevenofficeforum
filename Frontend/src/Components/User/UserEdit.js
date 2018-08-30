import React, { Fragment } from 'react';
import { InputWrapper } from '../CommonStyledComponents';
import { Button } from '../CommonComponents/Button';


const UserEdit = ({ user, onclick, handleSubmit, handleChange }) => {
    return (
        <Fragment>
            <h2>Edit user</h2>
            <InputWrapper>
                <form>

                    <label>Firstname:
            <input onChange={handleChange} name="firstName" defaultValue={user.firstName} />
                        <br />
                    </label>

                    <label>Lastname:
            <input onChange={handleChange} name="lastName" defaultValue={user.lastName} />
                        <br />
                    </label>

                    <label>E-Mail:
            <input onChange={handleChange} name="email" defaultValue={user.email} />
                        <br />
                    </label>

                    <label>Telephone:
            <input onChange={handleChange} name="phone" defaultValue={user.phone} />
                        <br />
                    </label>

                    <label>Company:
            <input onChange={handleChange} name="company" defaultValue={user.company} />
                        <br />
                    </label>

                </form>

            </InputWrapper>
            <Button onclick={handleSubmit} color="#224477" text="Save" />
            <Button onclick={onclick} color="#224477" text="Back" />
        </Fragment>
    );
}

export default UserEdit;