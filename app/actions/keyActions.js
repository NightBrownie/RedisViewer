import * as actionTypes from '../constants/actionTypes/index'

/* Key data */
export const requestData = (server, key) => ({
  type: actionTypes.KEY_REQUEST_DATA,
  server,
  key
})

export const dataReceived = (server, key, data) => ({
  type: actionTypes.KEY_DATA_RECEIVED,
  server,
  key,
  data
})

export const dataRequestFailed = (server, key) => ({
  type: actionTypes.KEY_DATA_REQUEST_FAILED,
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

export const unsubscribed = (server, key) => ({
  type: actionTypes.KEY_UNSUBSCRIBED,
  server,
  key
})

export const unsubscriptionFailed = (server, key) => ({
  type: actionTypes.KEY_UNSUBSCRIPTION_FAILED,
  server,
  key
})
