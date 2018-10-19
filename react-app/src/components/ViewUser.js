import React, { Component } from 'react';
import './DeletePerson.css';

class ViewUser extends Component {
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
      const request = new Request('http://127.0.0.1:8080/getusers');
      fetch(request)
        .then(response => response.json())
          .then(data => this.setState({data: data}));
    }
    handleRadioInput(event){
      this.setState({value:event.target.value});
    }

    handleSubmit (event) {
      if(this.state.value == 102){
        alert("Cant delete the admin")
      }
      else {
        event.preventDefault();
        fetch('http://localhost:8080/deleteuser/' + this.state.value, {
        method: 'delete',
      })
          .then(response => {
            if(response.status >= 200 && response.status < 300)
              this.setState({submitted: true});
          });
      }
      window.location.reload();
    }
 render() {

   if(localStorage.getItem('admin') == 1){
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
              <th>Username</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key)=>{
               return (
                  <tr key = {key}>
                      <td><input type="radio" name="radio_button" value={item.id} onClick={this.handleRadioInput}/></td>
                      <td>{item.username}</td>
                  </tr>
                )
              })}
          </tbody>
       </table>
       <button type="submit" className="btn btn-default">Submit</button>
      </form>
      { this.state.submitted &&
        <h3>Deleted</h3>
      }
      </div>
    );
    }
    else{
      return (<p>You need to be an admin</p>);
    }
  }
}

export default ViewUser;