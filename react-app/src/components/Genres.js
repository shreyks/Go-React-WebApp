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
    const request = new Request('http://127.0.0.1:8080/getgenres');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  handleFunc(event){
    localStorage.setItem('genre', (event.target.id));
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
          <h1 className="App-title">View All Genres</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th class="test">Genres</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key) => {
               return (
                  <tr key = {key} >
                      <td><a href="http://localhost:3000/Quizzes" onClick={this.handleFunc} id = {item}>{item}</a></td>
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