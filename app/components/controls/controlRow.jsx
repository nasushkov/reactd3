import React, {Component} from 'react'
import _ from 'lodash'

import Toggle from './toggle.jsx'

export default class ControlRow extends Component {
    addToggle = (name) => {
        const key = `toggle-${name}`
        let label = name

        if(this.props.capitalize){
            label = label.toUpperCase()
        }

        return (
            <Toggle label={label}
                    name={name}
                    key={key}
                    value={this.state.toggleValues[name]}
                    onClick={this.onToggleChanged}
            />
        )
    };

    onToggleChanged = (name, val) => {
        let toggleValues = this.state.toggleValues
        toggleValues = _.mapValues(toggleValues, (value, key) => val && key == name)        
        this.setState({toggleValues: toggleValues})
        this.props.onUpdateFilter(val ? name : '*')
    };

    componentWillMount(){
        const {getToggleNames, data} = this.props

        const toggles = getToggleNames(data)
        const toggleValues =_.zipObject(toggles, toggles.map(() => false))
        this.state = {toggleValues: toggleValues}
    }

    render() {
        const {getToggleNames, data} = this.props

        return (
            <div className="row">
                <div className="col-md-12">
                    {getToggleNames(data).map(name => this.addToggle(name))}
                </div>
            </div>)
    }
}