import React, { Component } from 'react';
import ViewUser from './ViewUser';
import AddQuestion from './AddQuestion';
import Genres from './Genres';
import Quizzes from "./Quizzes"
import ViewQuiz from './ViewQuiz'
import Home from './Home';
import Quiz from './Quiz';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      admin: false,
      x: 0,
    };
    this.LogOut = this.LogOut.bind(this);
  }
  componentDidMount() {
    this.setState({x:1});
  }

  LogOut(event){
    event.preventDefault();
    localStorage.setItem('token', -1);
    localStorage.setItem('admin', 0);
    window.location = "http://localhost:3000/"
  }
  render() {
    return (
      <div>
        <Router>
          <div>
          
            <nav className="navbar navbar-default">
               <div className="container-fluid">
                <div className="navbar-header">
                  <p className="navbar-brand" >QUIZ UP</p>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/Genres'}> Take a Quiz </Link></li>
                  <li><Link to={'/ViewQuiz'}>View All Quizzes</Link></li>
                  <li><Link to={'/AddQuiz'}>Add Quiz(Admin Only)</Link></li>
                  <li><Link to={'/ViewUser'}>View Users(Admin Only)</Link></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                  <li><a href={'/'} onClick={this.LogOut} ><span class="glyphicon glyphicon-log-out"></span>   Logout </a></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/ViewQuiz' component={ViewQuiz} />
                 <Route exact path='/Genres' component={Genres} />
                 <Route exact path='/ViewUser' component={ViewUser} />
                 <Route exact path='/AddQuiz' component={AddQuestion} />
                 <Route exact path='/Quizzes' component={Quizzes} />
                 <Route exact path='/Quiz' component={Quiz} />   
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
