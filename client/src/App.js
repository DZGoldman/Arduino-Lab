import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";
import Input from "./components/Input";
import axios from "axios";
global.rootURL = "http://localhost:8080";
// global.rootURL = "http://bf66e188.ngrok.io"

class App extends Component {


  render() {
    return (
      <div className="App">
        <Board />
        <Input placeHolder={"send morse code"} url={"/morse"} />
        <Input placeHolder={"send to speak"} url={"/speak"} />Î
      </div>
    );
  }
}

export default App;
