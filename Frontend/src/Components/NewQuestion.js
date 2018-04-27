import React, { Component } from 'react';
import '../App.css';

class NewQuestion extends Component{
    constructor(props) {
        super(props);
        this.state = {questionHeading: '', questionBody: ''};
    
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.handleChangeHeading = this.handleChangeHeading.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeHeading(event) {
        this.setState({questionHeading: event.target.value});
      }
      handleChangeBody(event) {
        this.setState({questionBody: event.target.value});
      }
    
      handleSubmit(event) {
      /*  axios.put('https://5adf192bbf932f0014d11b7c.mockapi.io/kategorier/', {  
            heading: this.state.questionHeading,
            body: this.state.questionBody
          })
*/
        alert(this.state.questionHeading + " " + this.state.questionBody);
        event.preventDefault();
      }
    render() {
               return(
                 <form onSubmit={this.handleSubmit}>
       
          <input type="text" value={this.state.questionHeading} onChange={this.handleChangeHeading} />
          <input type="text" value={this.state.questionBody} onChange={this.handleChangeBody} />
        
        <input type="submit" value="Post" />
      </form>
              );
          }        
}


export default NewQuestion;