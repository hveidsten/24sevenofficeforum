import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchAllCategories } from '../../Actions/categoryActions';
import SidebarComponent from './SidebarComponent';
import './SidebarStyles.css';


class Sidebar extends Component {
  
  render() {
    return (
      <aside>
        {this.props.categories && 
        <SidebarComponent categories={this.props.categories} currentCategoryId={this.props.currentCategoryId} />}
      </aside>
    );
  }
}

const mapStateToProps = state => {
  return ({
    categories: state.category.allCategories,
    currentCategoryId: state.category.currentCategory ? state.category.currentCategory.id : 0
  });
}

export default connect(mapStateToProps, { fetchAllCategories }, null)(Sidebar);