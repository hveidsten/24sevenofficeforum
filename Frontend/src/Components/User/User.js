import React, {Component, Fragment} from 'react';
import UserEdit from './UserEdit';
import UserComponent from './UserComponent';
import {connect} from 'react-redux';
import {userSignIn, fetchUser} from '../../Actions/userActions';

class User extends Component{

    componentWillMount()  {
        this.props.fetchUser(this.props.match.params.userId);
        this.props.userSignIn(1);
    }
    

    render(){
        if(this.props.user){
        return(
            <Fragment>
                <UserComponent user={this.props.user} />
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
        userSignIn: (id) => dispatch(userSignIn(id)),
        fetchUser: (id) => dispatch(fetchUser(id))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(User);