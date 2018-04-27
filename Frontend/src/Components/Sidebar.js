import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import '../App.css';

class Sidebar extends Component{
    render(){
        return(
            <div className="Sidebar">
            <Link to="/"><p>Hjem</p></Link>
            <Link to="/kategori/1"><p>Test</p></Link>
            {this.props.categories.map(
                (c, key) => {return <Link to={"/"+c.id} key={key}><p>{c.category}</p></Link>}
            )}
            
            </div>
        );
    }
}

export default Sidebar;