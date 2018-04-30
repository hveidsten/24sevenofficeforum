import React, { Component } from 'react';
import '../App.css';
import Search from './Search';

class Header extends Component{
    render(){
        return(
            <div className="Header">
            <h3> 24SevenOffice forum</h3>
            <Search />

            </div>
        );
    }
}

export default Header;