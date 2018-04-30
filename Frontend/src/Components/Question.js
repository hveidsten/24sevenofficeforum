import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Question extends Component{

    render() {
        if(this.props.data.length == 0){
            console.log(this.props.data);
            return <h2>Vent litt</h2>;  
          }else{
              let catId= this.props.match.params.categoryid-1;
              let questionId = this.props.match.params.questionid-1;
              console.log(this.props.data);
               return(
               <div> 
                 <h2>{this.props.data[catId].questions[questionId].heading}</h2>
                 <h3>{this.props.data[catId].questions[questionId].body}</h3>
                    {this.props.data[catId].questions[questionId].answers.map((q, key) => <p key={key}>{q}</p>)}
                 </div>
              );
          }        
}
}

export default Question;