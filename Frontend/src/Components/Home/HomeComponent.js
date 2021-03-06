import React, { Fragment } from 'react';
import QuestionInList from '../QuestionList/QuestionInList';
import { Link } from 'react-router-dom';
import { Button } from '../CommonComponents/Button';

export const HomeComponent = ({ posts, categories, user }) => {

    return (
        <Fragment>
            <h2>Welcome {user.loggedInUser && user.loggedInUser.firstName}</h2>
            {user.loggedInUser &&
                <div>
                    <Link to='./new_question'>
                        <Button color="#49bd39"
                            text="New question" />
                    </Link>

                    <Link to={`./user/${user.loggedInUser.id}`}>
                        <Button color="#224477" text="My Profile" />
                    </Link>
                </div>}


            <h3>Recent questions:</h3>
            {posts && categories && posts.map((c, key) =>
                <QuestionInList linkToQuestion={"../../" +
                    categories.find(a => a.id === c.categoryId).categoryName.replace(' ', '_') + "/" + c.id}
                    question={c} key={key} />)}
        </Fragment>

    );
}

