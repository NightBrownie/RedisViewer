import configSaga from './config'
import serverSaga from './server'
import keySaga from './key'

export default function * rootSaga () {
  yield [
    configSaga(),
    serverSaga(),
    keySaga()
  ]
}
