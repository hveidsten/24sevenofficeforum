import React from 'react';
import '../App.css';
import Search from './Search';

//Container for spørsmål i listevisningen under kategori.
export const QuestionInList = ({heading, body}) => {
    return (
        <div style={{width:"30rem", paddingLeft:"5rem"}}>
            <h2>{heading}</h2>
            <p>{body}</p>
            <hr/>
         </div>

    );
}

//Container for ett enkelt spørsmål med svar.
export const QuestionWithAnswers = ({heading, body, answers}) => {
    return (
        <div style={{width:"30rem", paddingLeft:"5rem"}}>
            <h2>{heading}</h2>
            <p>{body}</p>
            <hr/>
        </div>

    );
}

//Header
export const Header = ({heading, body, answers}) => {
    return (
            <div className="Header">
               <h3> 24SevenOffice forum</h3>
               <Search />

            </div>

    );
}



