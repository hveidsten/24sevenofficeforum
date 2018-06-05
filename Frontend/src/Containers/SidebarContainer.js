import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../App.css';
import {fetchAllCategories} from '../Actions/categoryActions';
import Sidebar from '../Components/Sidebar';
class SidebarContainer extends Component {



  render() {
    
    if(this.props.category){ 
       return (
      <div className="Sidebar">
        <Sidebar categories={this.props.category} />

      </div>
    );
  
    }
    else{return <h3>vent</h3>}
   
  }
}

const mapStateToProps = state => {
 return ({category: state.category.allCategories});
}

export default connect(mapStateToProps,{fetchAllCategories},null,{ pure: false})(SidebarContainer);
