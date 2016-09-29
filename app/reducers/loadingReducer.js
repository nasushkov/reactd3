import { handleActions } from 'redux-actions'
import {START_LOADING, DATA_LOADED} from '../actions/loadActions'

export default handleActions({
    [START_LOADING]: (state, action) => true,
    [DATA_LOADED]: (state, action) => false
}, false)