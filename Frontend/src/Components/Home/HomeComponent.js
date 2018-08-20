import React, { Fragment } from 'react';
import QuestionInList from '../QuestionList/QuestionInList';

export const HomeComponent = ({ posts, categories }) => {

    return (
        <Fragment>
            <h2>Frontpage</h2>
            {posts && categories && posts.map((c, key) =>
                <QuestionInList linkToQuestion={"../../" +
                    categories.find(a => a.id === c.categoryId).categoryName.replace(' ', '_') + "/" + c.id}
                    question={c} key={key} />)}
        </Fragment>

    );
}

