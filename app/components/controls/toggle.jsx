import React, {Component} from 'react'

export default class Toggle extends Component {
    constructor(props){
        super(props)
        this.state = {value: false}
    }

    componentWillReceiveProps(newProps){
        this.setState({value: newProps.value})
    }

    handleClick = () => {
        const newVal = !this.state.value
        this.setState({value: newVal})
        this.props.onClick(this.props.name, newVal)
    }

    render(){
        let className = 'btn btn-default'
        if(this.state.value){
            className += ' btn-primary'
        }

        return (
            <button className={className} onClick={this.handleClick}>
                {this.props.label}
            </button>
        )
    }
}