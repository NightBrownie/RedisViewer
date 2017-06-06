import configSaga from './config.saga'
import serverSaga from './server.saga'

export default function * rootSaga () {
  yield [
    configSaga(),
    serverSaga()
  ]
}
