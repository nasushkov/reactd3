import {combineReducers} from 'redux'

import rawData from './rawDataReducer'
import loading from './loadingReducer'
import filter from './filterReducer'

export default combineReducers({
    rawData,
    loading,
    filter
})