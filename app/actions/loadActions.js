import {createAction} from 'redux-actions'

export const START_LOADING = 'START_LOADING'
export const DATA_LOADED = 'DATA_LOADED'

export const startLoading = createAction(START_LOADING)
export const dataLoaded = createAction(DATA_LOADED)