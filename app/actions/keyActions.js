import * as actionTypes from '../constants/actionTypes/key'

/* Key data */
export const requestData = (server, key) => ({
  type: actionTypes.REQUEST_DATA,
  server,
  key
})

export const dataReceived = (server, key, data) => ({
  type: actionTypes.DATA_RECEIVED,
  server,
  key,
  data
})

export const dataRequestFailed = (server, key) => ({
  type: actionTypes.DATA_REQUEST_FAILED,
  server,
  key
})

/* Key subscription */
export const subscribe = (server, key) => ({
  type: actionTypes.SUBSCRIBE,
  server,
  key
})

export const subscribed = (server, key) => ({
  type: actionTypes.SUBSCRIBED,
  server,
  key
})

export const subscriptionFailed = (server, key) => ({
  type: actionTypes.SUBSCRIPTION_FAILED,
  server,
  key
})

export const unsubscribe = (server, key) => ({
  type: actionTypes.UNSUBSCRIBE,
  server,
  key
})

export const unsubscribed = (server, key) => ({
  type: actionTypes.UNSUBSCRIBED,
  server,
  key
})

export const unsubscriptionFailed = (server, key) => ({
  type: actionTypes.UNSUBSCRIPTION_FAILED,
  server,
  key
})
