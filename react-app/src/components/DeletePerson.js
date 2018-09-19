import React, { Component } from 'react';
import './DeletePerson.css';

class DeletePerson extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      value: 0
    }
    this.handleRadioInput = this.handleRadioInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    // Lifecycle hook, runs after component has mounted onto the DOM structure
    componentDidMount() {
      const request = new Request('http://127.0.0.1:8080/people/');
      fetch(request)
        .then(response => response.json())
          .then(data => this.setState({data: data}));
    }
    handleRadioInput(event){
      this.setState({value:event.target.value});
    }

    handleSubmit (event) {
      event.preventDefault();
      fetch('http://localhost:8080/people/' + this.state.value, {
       method: 'delete',
     })
        .then(response => {
          if(response.status >= 200 && response.status < 300)
            this.setState({submitted: true});
        	setTimeout(document.location.reload(), 5000);
        });
    }

 render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Deleting Someone</h1>
        </header>

        <form onSubmit={this.handleSubmit}>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Check to Delete</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key)=>{
               return (
                  <tr key = {key}>
                      <td><input type="radio" name="radio_button" value={item.id} onClick={this.handleRadioInput}/></td>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.city}</td>
                  </tr>
                )
              })}
          </tbody>
       </table>
       <button type="submit" className="btn btn-default">Submit</button>
      </form>
      { this.state.submitted &&
        <h3>Dat nibba deleted</h3>
      }
      </div>
    );
  }
}

export default DeletePerson;