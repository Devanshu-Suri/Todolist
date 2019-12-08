import React, { Component } from "react";

import Login from "./Components/login";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.clearUsers();
    this.loadUsers();
  }

  clearUsers() {
    localStorage.clear();
  }

  loadUsers() {
    const users = [
      { userName: "devu", password: "lll" },
      { userName: "arbaz", password: "lll" },
      { userName: "karan", password: "lll" }
    ];

    localStorage.setItem("users", JSON.stringify(users));
  }

  render() {
    // return login component
    return <Login />;
  }
}

export default App;
