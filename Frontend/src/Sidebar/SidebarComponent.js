import React, { Component } from 'react';
import {NavLink } from 'react-router-dom';
import '../App.css';

class Sidebar extends Component{
    render(){
        return(
            <div className="Sidebar">
            <NavLink exact to="/" activeStyle={{ color: '#ffffff', fontWeight: 'bold'}}>Hjem<hr/></NavLink>
            
            {this.props.categories.map(
                (c, key) => {return <NavLink exact to={"/"+c.categoryName.split(' ').join('_')} key={key}  style={this.props.currentCategoryId===c.id?{ color: '#ffffff', fontWeight: 'bold'}:{}}>{c.categoryName}<hr/></NavLink>})}
            
            </div>
        );
    }
}

export default Sidebar;