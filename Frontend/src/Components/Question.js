import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Question extends Component{

    render() {
        if(this.props.data == undefined){
            return <h2>Vent litt</h2>;  
          }else{
               return(
               <div> 
                 <h2>{this.props.data[0].questions[0].heading}</h2>
                 <h3>{this.props.data[0].questions[0].body}</h3>
                    {this.props.data[0].questions[0].answers.map((q, key) => <Link to={this.props.data.category + "/" +q.heading} key={key}><h3>{q.heading}</h3> <p>{q.body}</p><hr/></Link>)}
              
                  </div>
              );
          }
        
         
}
}

export default Question;