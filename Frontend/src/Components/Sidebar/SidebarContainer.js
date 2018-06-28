import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchAllCategories} from '../../Actions/categoryActions';
import SidebarComponent from './SidebarComponent';


class SidebarContainer extends Component {

  render() {
   console.log(this.props);
    if(this.props.categories){ 
       return (
      <div className="Sidebar">
        <SidebarComponent categories={this.props.categories} currentCategoryId={this.props.currentCategoryId} />
      </div>

    );
    }
    else{return <h3>vent</h3>}
  }
}

const mapStateToProps = state => {
 return ({categories: state.category.allCategories,
  currentCategoryId: state.category.currentCategory? state.category.currentCategory.id : 0
});
}

export default connect(mapStateToProps,{fetchAllCategories},null)(SidebarContainer);