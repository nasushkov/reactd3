import {createSelector} from 'reselect'

const getFilter = (state) => state.filter
const getRawData = (state) => state.rawData

export const getVisibleData = createSelector(
    [getFilter, getRawData],
    (filter, data) => {
        if(filter.year === '*' && filter.state === '*'){
            return data
        }
        let res = data
        if(filter.year !== '*'){
            res = res.filter(d => d.submit_date.getFullYear() === filter.year)
        }
        if(filter.state !== '*'){
            res = res.filter(d => d.state === filter.state)
        }
        return res
    }
)