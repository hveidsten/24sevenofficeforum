import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Category extends Component{


    render() {
        if(this.props.data == undefined){
            return <h2>Vent litt</h2>;  
          }else{
               return(
               <div> 
                 <h2>{this.props.data.category}</h2>
                    {this.props.data.questions.map((q, key) => <Link to={this.props.data.id + "/" +q.id} key={key}><h3>{q.heading}</h3> <p>{q.body}</p><hr/></Link>)}
              
                  </div>
              );
          }
        
         
}
}

export default Category;