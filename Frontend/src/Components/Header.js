import React from 'react';
import '../App.css';
import SearchContainer from '../Containers/SearchContainer';
import { Link } from 'react-router-dom';



//Header
export const Header = ({heading, body, answers}) => {
    return (
            <div className="Header">
               <Link to="" style={{color:"white"}}><h3> 24SevenOffice forum</h3></Link>
               <SearchContainer />

            </div>

    );
}



