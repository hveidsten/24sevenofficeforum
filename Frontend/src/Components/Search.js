import React, { Component } from 'react'

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: ''
          }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


 handleChange(event) {
    this.setState({query: event.target.value});
  }

 handleSubmit(event) {
    //TODO: Bytte ut med en faktisk søkefunksjon.
    alert("Du har søkt etter: " + this.state.query);
    event.preventDefault();
  }
 render() {
   return (
     <form  onSubmit={this.handleSubmit}>
       <input
         placeholder="Søk: "
         value={this.state.query}
         onChange={this.handleChange}
       />
       <input type="submit" value="søk"/>
      
     </form>
   )
 }
}

export default Search
