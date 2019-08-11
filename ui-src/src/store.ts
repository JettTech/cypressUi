import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { holochainMiddleware } from '@holochain/hc-redux-middleware'
import { connect } from '@holochain/hc-web-client'
import holoVault from './hApps/holo-vault/reducer'
import deepKey from './hApps/deepkey/reducer'

let rootReducer = combineReducers({
  holoVault: holoVault,
  deepKey: deepKey
})

const REACT_APP_CHAT_WEBSOCKET_INTERFACE = process.env.REACT_APP_CHAT_WEBSOCKET_INTERFACE

let middleware: Array<any>
if (REACT_APP_CHAT_WEBSOCKET_INTERFACE) {
  middleware = [holochainMiddleware(connect(REACT_APP_CHAT_WEBSOCKET_INTERFACE))]
} else {
  middleware = [holochainMiddleware(connect())]
}

const asyncDispatchMiddleware = (store: any) => (next: any) => (action: any) => {
  let syncActivityFinished = false
  let actionQueue: Array<any> = []

  function flushQueue () {
    actionQueue.forEach(a => store.dispatch(a)) // flush queue
    actionQueue = []
  }

  function asyncDispatch (asyncAction: any) {
    actionQueue = actionQueue.concat([asyncAction])

    if (syncActivityFinished) {
      flushQueue()
    }
  }

  const actionWithAsyncDispatch =
      Object.assign({}, action, { asyncDispatch })

  next(actionWithAsyncDispatch)
  syncActivityFinished = true
  flushQueue()
}

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

function CreateStore () {

  middleware.push(asyncDispatchMiddleware)

  return createStore(
  	rootReducer,
  	composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
}

export default CreateStore
