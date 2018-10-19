import React, { Component } from 'react';
import './Home.css'

class Home extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        password: "",
      },
      logged_in: false,
      login: true,
      data: {},

    };
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSubmitSignup = this.handleSubmitSignup.bind(this);
    this.register = this.register.bind(this);
    this.sessionCache = this.sessionCache.bind(this)
  }
  handleSubmitLogin (event) {
    event.preventDefault();
    const request = new Request('http://127.0.0.1:8080/authenticate');

    fetch(request, {
    method: 'POST',
    body: JSON.stringify(this.state.formData),
    })
      .then(response => response.json())
       .then(data => this.setState({data: data}))
         .then(() => this.sessionCache());
  }

  handleSubmitSignup (event) {
    event.preventDefault();
    const request = new Request('http://127.0.0.1:8080/signup');
    fetch(request , {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
    })
    .then(response => response.json())
      .then(data => this.setState({data: data}))
          .then(() => this.sessionCache());
  
  }

  sessionCache() {
    localStorage.setItem('token', JSON.stringify(this.state.data.pid));
    if(this.state.data.pid == 102){
      localStorage.setItem('admin',1);
    }
    if(this.state.data.pid != -1){
      window.location = "http://localhost:3000/Genres";
    }
    else{
      alert("Please try again");
      window.location.reload();
    }
  }

   
   handleUChange(event) {
     this.state.formData.username = event.target.value;
   }
   handlePChange(event) {
     this.state.formData.password = event.target.value;
   }
   register(event) {
    this.state.login = false
   }




    render() {
      localStorage.setItem('token',-1);

      return (
        // <div className="App">
        //   <header className="App-header">
        //     <h1 className="App-title">Welcome to React</h1>
        //   </header>
        // </div>
        <div class="container">
             <header>
                <h1>Quiz Up<span> With Shrey</span></h1>
              </header>
              <section>       
                  <div id="container_demo" >
                      <a class="hiddenanchor" id="toregister"></a>
                      <a class="hiddenanchor" id="tologin"></a>
                      <div id="wrapper">
                          <div id="login" class="animate form">
                              <form  onSubmit={this.handleSubmitLogin} autocomplete="on"> 
                                  <h1>Log in</h1> 
                                  <p> 
                                      <label for="username" class="uname" data-icon="u" > Your email or username </label>
                                      <input id="username" name="username" required="required" type="text" placeholder="myusername" value={this.state.username} onChange={this.handleUChange}/>
                                  </p>
                                  <p> 
                                      <label for="password" class="youpasswd" data-icon="p"> Your password </label>
                                      <input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" value={this.state.password} onChange={this.handlePChange}/> 
                                  </p>
                                  <p class="login button"> 
                                      <input type="submit" value="Login" /> 
                                  </p>
                                  <p class="change_link">
                    Not a member yet ?
                    <a href="#toregister" class="to_register" onClick={this.register}>Join us</a>
                  </p>
                    </form>
                          </div>

                          <div id="register" class="animate form">
                              <form  onSubmit={this.handleSubmitSignup} autocomplete="on"> 
                                  <h1> Sign up </h1> 
                                  <p> 
                                      <label for="usernamesignup" class="uname" data-icon="u">Your username</label>
                                      <input id="usernamesignup" name="usernamesignup" required="required" type="text" placeholder="mysuperusername690" value={this.state.username} onChange={this.handleUChange}/>
                                  </p>
                                  <p> 
                                      <label for="passwordsignup" class="youpasswd" data-icon="p">Your password </label>
                                      <input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="eg. X8df!90EO" value={this.state.password} onChange={this.handlePChange}/>
                                  </p>  
                                  <p class="signin button"> 
                    <input type="submit" value="Sign up"/> 
                  </p>
                                  <p class="change_link">  
                    Already a member ?
                    <a href="#tologin" class="to_register"> Go and log in </a>
                  </p>
                    </form>
                </div>
              
              </div>
            </div>  
          </section>
        </div>
      );
    }
  }

export default Home;
