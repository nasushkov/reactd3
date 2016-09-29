import React, {Component} from 'react'
import {connect} from 'react-redux'

import {getVisibleData} from '../selectors'
import Histogram from '../components/histogram'
import Controls from '../components/controls'

class H1BGraph extends Component {
    render() {
        const {loading, rawData, visibleData} = this.props;

        if (loading) {
            return (<h2>Loading data about 81,000 H1B visas in the software industry...
            </h2>)
        }

        const params = {
            bins: 20,
            width: 500,
            height: 500,
            axisMargin: 83,
            topMargin: 10,
            bottomMargin: 5,
            value: (d) => d.base_salary
        }

        const fullWidth = 700

        return (
            <div>
                <svg width={fullWidth} height={params.height}>
                    <Histogram {...params} data={visibleData}/>
                </svg>
                <Controls />
            </div>
        )
    }
}

export default connect((state) => (
{
    visibleData: getVisibleData(state),
    loading: state.loading
}))(H1BGraph)



