import React from 'react';
import QuestionInList from '../QuestionList/QuestionInList';

export const HomeComponent = ({posts, categories, userIsloggedIn, userName}) => {
   
    return(
        <div>
            
            <div>
                <h2>Nyeste spørsmål</h2>
        {posts && categories && posts.map((c,key) => <QuestionInList linkToQuestion={"../../"+categories.find(a => a.id===c.categoryId).categoryName.replace(' ','_')+"/"+c.id} question={c} key={key}/> )}
        </div>
        </div>
    );
}