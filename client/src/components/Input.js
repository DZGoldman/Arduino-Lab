import React, { Component } from "react";
import axios from 'axios';

class Input extends Component {
    constructor(){
        super()
        this.state = {
            text:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({text: e.target.value})
    }
    
    async onSubmit(){
        const res = await axios.post(global.rootURL + this.props.url, {text: this.state.text})
        if (res.status == 200){
            this.setState({text:''})
        }
    }
    render (){
        return <div>
        <input 
            value={this.state.text} 
            type='text' 
            onChange={this.onChange}
            placeholder={this.props.placeHolder}
        />
        <input type='submit' text='send!' onClick={this.onSubmit}/>
        </div>
    }
}

export default Input;