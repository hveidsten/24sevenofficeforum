import React, { Fragment } from 'react';
import QuestionInList from '../QuestionList/QuestionInList';

export const HomeComponent = ({ posts, categories, user }) => {

    return (
        <Fragment>
            <h2>Welcome { user.loggedInUser &&user.loggedInUser.firstName}</h2> 


            <h3>Recent questions:</h3>
            {posts && categories && posts.map((c, key) =>
                <QuestionInList linkToQuestion={"../../" +
                    categories.find(a => a.id === c.categoryId).categoryName.replace(' ', '_') + "/" + c.id}
                    question={c} key={key} />)}
        </Fragment>

    );
}

