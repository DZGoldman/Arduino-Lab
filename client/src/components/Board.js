import React, { Component } from "react";
import LightButton from "./LightButton";
import axios from 'axios'

class Board extends Component {
    constructor(){
        super()
        this.state = {
            buttons: [
              { color: "yellow", isOn: false },
              { color: "red", isOn: false },
              { color: "white", isOn: false },
              { color: "green", isOn: false }
            ]
        }
        this.getBoardState = this.getBoardState.bind(this)
        this.setBoardState = this.setBoardState.bind(this)

        window.c = this
    }

    componentDidMount(){
        window.setInterval(this.getBoardState, 1000)
    }

    async getBoardState() {
        const res = await axios.get(global.rootURL + '/state');
        this.setBoardState(res.data)
    }
    setBoardState(buttons){
        this.setState({buttons})
    }
    



  render() {
    return <div id="board"> 
    {this.state.buttons.map((button, index)=>{
        return <LightButton
            isOn = {button.isOn}
            color= {button.color}
            key={button.color}
            setBoardState={this.setBoardState}
        />
    })}
    </div>
  }
}

export default Board;
