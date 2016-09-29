import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

import {setFilter} from '../../actions/filterActions'
import ControlRow from './controlRow.jsx'

class Controls extends Component {
    updateYearFilter = (year) => {
        this.props.onSetFilter({
            year: year
        })
    }

    updateState = (state) => {
        this.props.onSetFilter({
            state: state
        })
    }
    
    getYears(data){
        return _.keys(_.groupBy(data, d => d.submit_date.getFullYear()))
            .map(Number)
    }
    
    getStates(data){
        return _.sortBy(_.keys(_.groupBy(data, d => d.state)))
    }

    render(){
        const {data} = this.props
        
        return (
            <div>
                <ControlRow data={data} onUpdateFilter={this.updateYearFilter} getToggleNames={this.getYears}/>
                <ControlRow data={data} onUpdateFilter={this.updateState} getToggleNames={this.getStates}/>
            </div>
        )
    }
}


export default connect((state) => ({
    data: state.rawData,    
}), (dispach) => ({
    onSetFilter: (data) => dispach(setFilter(data))
}))(Controls)

