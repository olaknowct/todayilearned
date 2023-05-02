import { takeLatest, all, call } from 'redux-saga/effects';
import { fetchFactsSaga, updateFactSaga, createFactSaga } from './facts.workerSaga';
import { fetchFactsStart, updateFactStart, createFactStart } from './facts.reducer';

export function* watchGetFactsStart() {
  yield takeLatest(fetchFactsStart, fetchFactsSaga);
}

export function* watchUpdateFactStart() {
  yield takeLatest(updateFactStart, updateFactSaga);
}

export function* watchCreateFactStart() {
  yield takeLatest(createFactStart, createFactSaga);
}

export function* factsSagas() {
  yield all([call(watchGetFactsStart), call(watchUpdateFactStart), call(watchCreateFactStart)]);
}
