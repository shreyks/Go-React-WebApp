import React, { Component } from 'react';
import './Genres.css';

class Genres extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.handleFunc = this.handleFunc.bind(this);
  }
  componentDidMount() {
    fetch(('http://127.0.0.1:8080/getquizes/' +  window.localStorage.getItem("genre")))
      .then(response => response.json())
        .then(data => {this.setState({data: data})});
  }

  handleFunc = event => {
    localStorage.setItem('quiz', (event.target.id));
  }

  render() {
    let page;
    let log = localStorage.getItem("token")
    if(log == "-1"){
      return( <p> Please Login/Signup to Access </p> )
    }
    else { 
      return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Quiz Numbers</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th class="test">Quiz IDs</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key) => {
               return (
                  <tr key = {key} >
                    <td><a href="http://localhost:3000/Quiz" onClick={this.handleFunc} id = {item.id}>{item.id}</a></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
      )
    }
  }
}

export default Genres;