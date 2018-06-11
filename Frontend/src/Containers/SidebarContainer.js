import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../App.css';
import {fetchAllCategories} from '../Actions/categoryActions';
import Sidebar from '../Components/Sidebar';
class SidebarContainer extends Component {

  render() {
   
    if(this.props.categories){ 
       return (
         
      <div className="Sidebar">
        <Sidebar categories={this.props.categories} currentCategoryId={this.props.currentCategoryId} />
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
export default connect(mapStateToProps,{fetchAllCategories},null,{ pure: false})(SidebarContainer);
