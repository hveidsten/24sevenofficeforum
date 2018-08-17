import React, {Component, Fragment} from 'react';
import UserEdit from './UserEdit';
import UserComponent from './UserComponent';
import {connect} from 'react-redux';
import {userIsLoggedIn} from '../../Actions/userActions';

class User extends Component{

    componentWillMount()  {
        this.props.userIsLoggedIn();
    }
    

    render(){
        if(this.props.user){
        return(
            <Fragment>
                {parseInt(this.props.match.params.userId)===this.props.user.userId?
                 <UserEdit /> : <UserComponent />}
            </Fragment>
        );
    }else{
        return <h2>vent</h2>
    }
    }
}

const mapStateToProps = state => (
    {
        user: state.user
    }
);

const mapDispatchToProps = (dispatch) => {

    return {
        userIsLoggedIn: () => dispatch(userIsLoggedIn())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(User);