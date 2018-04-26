import React, { Component } from 'react';
import '../App.css';

class Sidebar extends Component{
    render(){
        return(
            <div className="Sidebar">
            {this.props.categories.map(
                c => {return <a href={c.category}><p>{c.category}</p></a>}
            )}
            
            </div>
        );
    }
}

export default Sidebar;