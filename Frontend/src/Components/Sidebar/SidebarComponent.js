import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


class Sidebar extends Component {
    render() {
        return (
            <Fragment>
                <StyledNavlink exact to="/" activeStyle={{ color: '#ffffff', fontWeight: 'bold' }}>Hjem<hr /></StyledNavlink>

                {this.props.categories.map(
                    (c, key) => { return <StyledNavlink exact to={"/" + c.categoryName.replace(' ', '_')} key={key} style={this.props.currentCategoryId === c.id ? { color: '#ffffff', fontWeight: 'bold' } : {}}>{c.categoryName}<hr /></StyledNavlink> })}
            </Fragment>
        );
    }
}


const StyledNavlink = styled(NavLink)`
color: #acacac;
`


export default Sidebar;