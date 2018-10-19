import React, { Component } from 'react';
import './ViewPeople.css';

class AddQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        qno: 0,
        quizno: 0,
        ans:0,
        question: "",
        op1: "",
        op2: "",
        op3: "",
        op4: "",
      },
      submitted: false,
    }
    this.handleQnoChange = this.handleQnoChange.bind(this);
    this.handleQuiznoChange = this.handleQuiznoChange.bind(this);
    this.handleAnsChange = this.handleAnsChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleOp1Change = this.handleOp1Change.bind(this);
    this.handleOp2Change = this.handleOp2Change.bind(this);
    this.handleOp3Change = this.handleOp3Change.bind(this);
    this.handleOp4Change = this.handleOp4Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/addquiz', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          window.location = "http://localhost:3000/Genres"
        }
      })
  }

  handleQnoChange(event) {
    var integer = parseInt(event.target.value);
    this.state.formData.qno = integer;
  }
  handleQuiznoChange(event) {
    var integer = parseInt(event.target.value);
    this.state.formData.quizno = integer;
  }
  handleAnsChange(event) {
    var integer = parseInt(event.target.value);
    this.state.formData.ans = integer;
  }
  handleQuestionChange(event) {
    this.state.formData.question = event.target.value;
  }
  handleOp1Change(event) {
    this.state.formData.op1 = event.target.value;
  }
  handleOp2Change(event) {
    this.state.formData.op2 = event.target.value;
  }
  handleOp3Change(event) {
    this.state.formData.op3 = event.target.value;
  }
  handleOp4Change(event) {
    this.state.formData.op4 = event.target.value;
  }

  render() {
    if(localStorage.getItem('admin') == 1){
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Person</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
                <label>Quiz No</label>
                <input type="text" className="form-control" value={this.state.quizno} onChange={this.handleQuiznoChange}/>
            </div>
            <div className="form-group">
                <label>Question Number</label>
                <input type="text" className="form-control" value={this.state.qno} onChange={this.handleQnoChange}/>
            </div>
            <div className="form-group">
                <label>Answer Option(1/2/3/4)</label>
                <input type="text" className="form-control" value={this.state.ans} onChange={this.handleAnsChange}/>
            </div>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.question} onChange={this.handleQuestionChange}/>
            </div>
            <div className="form-group">
                <label>Option 1</label>
                <input type="text" className="form-control" value={this.state.op1} onChange={this.handleOp1Change}/>
            </div>
            <div className="form-group">
                <label>Option 2</label>
                <input type="text" className="form-control" value={this.state.op2} onChange={this.handleOp2Change}/>
            </div>
            <div className="form-group">
                <label>Option 3</label>
                <input type="text" className="form-control" value={this.state.op3} onChange={this.handleOp3Change}/>
            </div>
            <div className="form-group">
                <label>Option 4</label>
                <input type="text" className="form-control" value={this.state.op4} onChange={this.handleOp4Change}/>
            </div>
              <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              New question successfully added.
            </h2>
          </div>
        }

      </div>
    );
  }
  else {
    return (<p>You Need to be an Admin</p>);
  }
  } 
}
export default AddQuestion;
