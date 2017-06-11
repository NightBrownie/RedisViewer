import configSaga from './config.saga'
import serverSaga from './server.saga'
import keySaga from './key.saga'

export default function * rootSaga () {
  yield [
    configSaga(),
    serverSaga(),
    keySaga()
  ]
}
