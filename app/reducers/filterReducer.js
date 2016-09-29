import { handleActions } from 'redux-actions'
import Immutable from 'seamless-immutable'

import {SET_FILTER} from '../actions/filterActions'

export default handleActions({
    [SET_FILTER]: (state, action) => state.merge(action.payload)
}, Immutable.from({
    year: undefined
}))