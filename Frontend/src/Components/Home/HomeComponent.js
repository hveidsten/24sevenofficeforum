import React from 'react';
import QuestionInList from '../QuestionList/QuestionInList';

export const HomeComponent = ({posts, categories}) => {
    console.log(posts);
    return(
        
        <div>
        <h2>
            Forside!
        </h2>
        {posts && posts.map((c,key) => <QuestionInList heading={c.header} body={c.body} linkToQuestion={"../../"+categories.find(a => a.id===c.categoryId).categoryName.replace(' ','_')+"/"+c.id} votes={c.upvote} key={key}/> )}
        </div>
    );

}