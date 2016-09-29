import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {scaleLinear, axisLeft, max, select} from 'd3'


export default class Axis extends Component {
    constructor(props) {
        super(props)
        this.yScale = scaleLinear()
        this.axis = axisLeft(this.yScale)
            .tickFormat(d => '$' + this.yScale.tickFormat()(d))
        this.update_d3(props);
    }

    componentWillReceiveProps(newProps){
        this.update_d3(newProps)
    }

    update_d3({data, height, topMargin, bottomMargin}){
        this.yScale
            .domain([0, max(data, d => d.x1)])
            .range([0, height - topMargin + bottomMargin])

        this.axis
            .ticks(data.length)
            .tickValues(data.map(d => d.x0).concat(data[data.length-1].x1))
    }

    componentDidUpdate(){
        this.renderAxis()
    }

    componentDidMount(){
        this.renderAxis()
    }

    renderAxis(){
        const node = ReactDOM.findDOMNode(this)
        select(node).call(this.axis)
    }

    render() {
        const {axisMargin} = this.props;
        const translate = `translate(${axisMargin - 3}, 0)`

        return (
            <g className="axis" transform={translate}></g>
        )
    }
}