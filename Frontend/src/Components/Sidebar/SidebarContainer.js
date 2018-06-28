import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchAllCategories} from '../../Actions/categoryActions';
import SidebarComponent from './SidebarComponent';


class SidebarContainer extends Component {

  render() {
   console.log(this.props);
  
       return (
      <div className="Sidebar">
        {this.props.categories && <SidebarComponent categories={this.props.categories} currentCategoryId={this.props.currentCategoryId} />}
        
      </div>

    );
   
  }
}

const mapStateToProps = state => {
 return ({categories: state.category.allCategories,
  currentCategoryId: state.category.currentCategory? state.category.currentCategory.id : 0
});
}

export default connect(mapStateToProps,{fetchAllCategories},null)(SidebarContainer);