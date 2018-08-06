import React, { Component } from 'react';

import {userIsLoggedIn} from '../../Actions/userActions';
import {connect} from 'react-redux';

class UserLoginHeader extends Component {

     render(){
                return(
                    <div className="userLoginHeader">
                {this.props.user && this.props.user.isLoggedIn===true? 
             <p>Hallo {this.props.user.userName}   <span onClick={() => this.props.userIsLoggedIn(0)}>-logg ut </span></p>:
               <div>    
                        <a onClick={() => this.props.userIsLoggedIn(1)}>Logg inn </a> 
                       eller
                        <a> registrer deg</a>
                      
                        </div>
                         }
                         </div>
                        ); 
                 }
}



const mapStateToProps = state => ({
    
    user: state.user
});

export default connect( 
    mapStateToProps, {userIsLoggedIn}
  )(UserLoginHeader);