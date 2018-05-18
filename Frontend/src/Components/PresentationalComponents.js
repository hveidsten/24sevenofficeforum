import React from 'react';
import '../App.css';
import Search from './Search';
import { Link } from 'react-router-dom';



//Header
export const Header = ({heading, body, answers}) => {
    return (
            <div className="Header">
               <h3> 24SevenOffice forum</h3>
               <Search />

            </div>

    );
}



