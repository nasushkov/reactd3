import React, {Component} from 'react'
import {scaleLinear, histogram, extent} from 'd3'

import HistogramBar from './histogramBar.jsx'
import Axis from '../axis'

export default class Histogram extends Component{
    constructor(props){
        super(props)
        this.histogram = histogram()

        this.widthScale = scaleLinear()

        this.yScale = scaleLinear()
            .range([0, props.height])

        this.update_d3(props)
    }

    componentWillReceiveProps(newProps){
        this.update_d3(newProps)
    }

    update_d3(props){
        this.yScale
            .domain(extent(props.data, this.props.value))

        this.histogram
            .value(props.value)
            .domain(this.yScale.domain())
            .thresholds(this.props.bins)

        const bars = this.histogram(props.data)

        const counts = bars.map(d => d.length)

        this.widthScale
            .domain(extent(counts))
            .range([9 , props.width-props.axisMargin])
    }

    makeBar = (bar) => {
        const percent = bar.length/this.props.data.length*100

        const props  = {
            percent: percent,
            x: this.props.axisMargin,
            y: this.yScale(bar.x0),
            width: this.widthScale(bar.length),
            height: this.yScale(bar.x1 - bar.x0),
            key: `histogram-bar-${bar.x0}-${bar.x1}`
        }

        return (
            <HistogramBar {...props}/>
        )
    };

    render(){
        const {topMargin, bottomMargin, axisMargin, height, data} = this.props

        const translate = `translate(0, ${topMargin})`
        const bars = this.histogram(data)

        return (
            <g className="histogram" transform={translate}>
                <g className="bars">
                    {bars.map(this.makeBar)}
                </g>
                <g>
                    <Axis topMargin={topMargin}
                          bottomMargin={bottomMargin}
                          axisMargin={axisMargin}
                          height={height}
                          scale={this.yScale}
                          data={bars}
                    />
                </g>
            </g>
        )
    }
}