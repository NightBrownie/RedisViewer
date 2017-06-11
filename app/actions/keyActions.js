import * as actionTypes from '../constants/actionTypes'

/* Key data */
export const requestData = (server, key) => ({
  type: actionTypes.KEY_REQUEST_DATA,
  server,
  key
})

export const dataRequested = (server, key) => ({
  type: actionTypes.KEY_DATA_RECEIVED,
  server,
  key
})

/* Key subscription */
export const subscribe = (server, key) => ({
  type: actionTypes.KEY_SUBSCRIBE,
  server,
  key
})

export const subscribed = (server, key) => ({
  type: actionTypes.KEY_SUBSCRIBED,
  server,
  key
})

export const subscriptionFailed = (server, key) => ({
  type: actionTypes.KEY_SUBSCRIPTION_FAILED,
  server,
  key
})

export const unsubscribe = (server, key) => ({
  type: actionTypes.KEY_UNSUBSCRIBE,
  server,
  key
})
