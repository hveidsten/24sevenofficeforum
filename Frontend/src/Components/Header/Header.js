import React from 'react';
import Search from './Search';
import UserLoginHeader from './UserLoginHeader';
import { Link } from 'react-router-dom';


export const Header = ({heading, body, answers}) => {
    return (
            <div className="Header">
               <Link to="/" style={{color:"white"}}><h3> 24SevenOffice forum</h3></Link>
               <UserLoginHeader />
               <Search />
            </div>
    );
}
