import React, { Component } from 'react';
import { BrowserRouter, Route, Link, NavLink } from 'react-router-dom';
import '../App.css';

class Sidebar extends Component{
    render(){
        return(
            <div className="Sidebar">
            <NavLink exact to="/" activeStyle={{ color: '#ffffff', fontWeight: 'bold'}}>Hjem</NavLink>
            <hr/>
            {this.props.categories.map(
                (c, key) => {return <NavLink to={"/"+c.id} key={key} activeStyle={{ color: '#ffffff', fontWeight: 'bold'}}>{c.category}<hr/></NavLink>}
                
            )}
            
            </div>
        );
    }
}

export default Sidebar;