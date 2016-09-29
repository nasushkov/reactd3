import {handleActions} from 'redux-actions'
import Immutable from 'seamless-immutable'

import {DATA_LOADED} from '../actions/loadActions'

export default handleActions({
    [DATA_LOADED]: (state, action) => action.payload
}, Immutable.from([]))