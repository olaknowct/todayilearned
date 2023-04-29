import { all, call } from 'redux-saga/effects';
import { factsSagas } from './facts/facts.saga';

export function* rootSaga() {
  yield all([call(factsSagas)]);
}
