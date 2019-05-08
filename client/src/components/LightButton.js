import React, {Component} from 'react'
import axios from 'axios';

class LightButton extends Component {
    constructor(){
        super()
        this.toggleButton = this.toggleButton.bind(this)
    }

    async toggleButton(){
        const suffix = this.props.isOn ? 'off' : 'on'
        const res = await axios.post(global.rootURL + `/${suffix}`, {color: this.props.color})
        // console.log(res.data);
        // this.props.setBoardState(res.data)
        
    }
    render (){
        const opacity = this.props.isOn ? '1' : "0.1";
        const style = {
            backgroundColor: this.props.color,
            opacity
        }

        return <div className='light-button' style={style} onClick={this.toggleButton}></div>
    }
}

export default LightButton;