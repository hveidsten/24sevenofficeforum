import React, {Component} from 'react';
import Search from './Search';
import UserLoginHeader from './UserLoginHeader';
import { Link } from 'react-router-dom';
import './HeaderStyles.css';


class Header extends Component{

    shouldComponentUpdate(nextProps) {
        return this.props !== nextProps;    
      }

    render(){
    return (
        <header>
            <Link to="/"><h3> 24SevenOffice forum</h3></Link>
            <UserLoginHeader />
            <Search />
        </header>
    );
}
}

export default Header;
