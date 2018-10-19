import React, { Component } from 'react';
import './EditPerson.css';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      valueq1: 0,
      valueq2: 0,
      valueq3: 0,
      valueq4: 0,
      valueq5: 0,
      score: 0,
    }
    this.handleRadioInput = this.handleRadioInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    // Lifecycle hook, runs after component has mounted onto the DOM structure
    componentDidMount() {
      fetch(('http://127.0.0.1:8080/getquestions/' + window.localStorage.getItem("quiz")))
        .then(response => response.json())
          .then(data => { this.setState({data: data})});
    }

    handleRadioInput(event) {
      if(event.target.id == 1){
        this.setState({valueq1:event.target.value});
      }
      if(event.target.id == 2){
        this.setState({valueq2:event.target.value});
      }      
      if(event.target.id == 3){
        this.setState({valueq3:event.target.value});
      }      
      if(event.target.id == 4){
        this.setState({valueq4:event.target.value});
      }
      if(event.target.id == 5){
        this.setState({valueq5:event.target.value});
      }

    }
    handleSubmit(event) {
      if(this.state.data[0].ans == this.state.valueq1){
        this.state.score += 1;
      }
      if(this.state.data[1].ans == this.state.valueq2){
        this.state.score += 1;
      }      
      if(this.state.data[2].ans == this.state.valueq3){
        this.state.score += 1;
      }      
      if(this.state.data[3].ans == this.state.valueq4){
        this.state.score += 1;
      }
      if(this.state.data[4].ans == this.state.valueq5){
        this.state.score += 1;
      }
      alert("Your total score is:" + this.state.score);
      window.location = "http://localhost:3000/Genres";
    }
  render() {
    return (
        <div class="container">
          <h2>Quiz</h2>
          <form >
          {this.state.data.map((item, key)=>{
               return (
                //  <p>{item.question}</p>
                <div>{item.question}
                  <div class="radio">
                    <label><input type="radio" name={item.qno} value = {1} id={item.qno} onClick={this.handleRadioInput}/>{item.op1}</label>
                  </div>
                  <div class="radio">
                    <label><input type="radio" name={item.qno} value = {2} id={item.qno} onClick={this.handleRadioInput}/>{item.op2}</label>
                  </div>
                  <div class="radio ">
                    <label><input type="radio" name={item.qno} value = {3} id={item.qno} onClick={this.handleRadioInput}/>{item.op3}</label>
                  </div>                
                  <div class="radio ">
                    <label><input type="radio" name={item.qno} value = {4} id={item.qno} onClick={this.handleRadioInput}/>{item.op4}</label>
                  </div>
                </div>
                )
              })}
            <input type="button" value="  SUBMIT  " onClick={this.handleSubmit}/>
          </form>
        </div>
    );
  }
}

export default Quiz;
