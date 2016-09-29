import {call, put} from 'redux-saga/effects'

import {dataLoaded} from '../actions/loadActions'
import {getRows} from '../api/rawData'

export default function* initData(){
    const rows = yield call(getRows)
    yield put(dataLoaded(rows))
}