import configSaga from "./config.saga";

export default function* rootSaga() {
    yield [
        configSaga()
    ];
}
