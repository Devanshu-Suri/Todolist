import React from "react";
import "bulma/css/bulma.css";
import { Todolist } from "./todolist";
import "./login.css";
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.initErrorState = { usernameError: "", pwdError: "" };
    this.defaultErrorValues = {
      usernameError: "",
      pwdError: ""
    };
    this.state = {
      userName: "",
      pwd: "",
      errors: this.defaultErrorValues,
      isUserLoggedIn: false,
      userNotExist: false
    };
  }
  //   login() {

  //     localStorage.setItem("username", this.refs.username.value);
  //     localStorage.setItem("password", this.refs.pwd.value);

  //     this.setState({ userName, pwd, errors: this.defaultErrorValues });
  //   }

  login() {
    let userName = this.refs.username.value;
    let pwd = this.refs.pwd.value;
    console.log("UserName is ", userName);
    console.log("Password ", pwd);
    this.isUserValid(userName, pwd);
    if (!this.isValidString(userName)) {
      console.log("Error Userid .... ");
      this.defaultErrorValues.usernameError = "User Name is Empty";
    } else {
      this.defaultErrorValues.usernameError = "";
    }
    if (!this.isValidString(pwd)) {
      this.defaultErrorValues.pwdError = "Password Name is Empty";
    } else {
      this.defaultErrorValues.pwdError = "";
    }
    if (!this.isValidString(userName) && !this.isValidString(pwd)) {
    }
    this.defaultErrorValues = this.initErrorState;
    console.log("Errors are ", this.defaultErrorValues);
  }

  isUserValid(userName, password) {
    const users = JSON.parse(localStorage.getItem("users"));

    const isUserExist = users.findIndex(user => user.userName === userName);

    console.log(users[isUserExist]);

    if (isUserExist === -1) {
      this.defaultErrorValues.userNotExist = alert(
        "User not registered with us..!"
      );
      this.setState({ ...this.state, userNotExist: true });
    } else if (isUserExist > -1 && users[isUserExist].password === password) {
      this.defaultErrorValues.userNotExist = "";
      this.setState({ ...this.state, isUserLoggedIn: true });
    }
  }

  isValidString(str) {
    if (!str && str.trim().length === 0) {
      return false;
    }
    return true;
  }

  render() {
    if (this.state.isUserLoggedIn) {
      return <Todolist />;
    } else {
      return (
        <div classs="container is-fluid">
          <section class="hero is-primary">
            <div class="hero-body">
              <div class="has-text-centered">
                <div>
                  <h1 class="title tag is-danger is-large">Login Page</h1>
                </div>
                <br></br>

                <div class="field">
                  <p class="control has-icons-left">
                    <input
                      class="input is-success"
                      type="text"
                      ref="username"
                      placeholder="Username"
                    />
                  </p>
                </div>

                <div className="error">{this.state.errors.usernameError}</div>
                <div class="field">
                  <p class="control has-icons-left">
                    <input
                      class="input input is-success"
                      ref="pwd"
                      type="password"
                      placeholder="Password"
                    />
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="error">{this.state.errors.pwdError}</div>
                <div>{this.defaultErrorValues.userNotExist}</div>

                <div class="field">
                  <p class="control">
                    <button
                      class="button is-warning"
                      type="button"
                      onClick={this.login.bind(this)}
                    >
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}
export default Login;
