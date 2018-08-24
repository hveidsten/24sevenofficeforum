import React from 'react';
import Search from './Search';
import UserLoginHeader from './UserLoginHeader';
import { Link } from 'react-router-dom';
import './HeaderStyles.css';


const Header = () => {
    return (
        <header>
            <Link to="/"><h3> 24SevenOffice forum</h3></Link>
            <UserLoginHeader />
            <Search />
        </header>
    );
}

export default Header;
