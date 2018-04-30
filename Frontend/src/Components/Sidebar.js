import React, { Component } from 'react';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import '../App.css';

class Sidebar extends Component{
    render(){
        return(
            <div className="Sidebar">
            <NavLink to="/" >Hjem</NavLink>
            <hr/>
            {this.props.categories.map(
                (c, key) => {return <NavLink to={"/"+c.id} key={key} activeStyle={{ backgroundColor: '#6699bb'}}>{c.category}<hr/></NavLink>}
                
            )}
            
            </div>
        );
    }
}

export default Sidebar;