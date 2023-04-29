import { call, put, select } from 'redux-saga/effects';
import {
  fetchFactsFailed,
  fetchFactsSuccess,
  updateFactSuccess,
  updateFactFailed,
  createFactSuccess,
  createFactFailed,
} from './facts.reducer';
import supabase from '../../supabase';
import { selectCurrentCategory, selectFactList } from './facts.selector';
// Fetch Users Saga
export function* fetchFactsSaga() {
  try {
    const currentCategory = yield select(selectCurrentCategory);

    let query = supabase.from('facts').select('*');

    if (currentCategory !== 'all') query = query.eq('category', currentCategory);

    query = query.order('votesInteresting', { ascending: true });

    const { data: facts, error } = yield call([query, query.limit], '100');

    if (error) throw new Error(error.message);

    yield put(fetchFactsSuccess(facts));
  } catch (error) {
    yield put(fetchFactsFailed(error));
  }
}

export function* updateFactSaga(action) {
  try {
    const { factType, factId, totalVote } = action.payload;

    let query = supabase
      .from('facts')
      .update({ [factType]: totalVote })
      .eq('id', factId);

    const { data: updatedFact, error } = yield call([query, query.select]);

    if (error) throw new Error(error.message);

    const facts = yield select(selectFactList);

    const updatedFacts = facts.map((fact) => (fact.id === factId ? updatedFact[0] : fact));

    yield put(updateFactSuccess(updatedFacts));
  } catch (error) {
    yield put(updateFactFailed(error));
  }
}

export function* createFactSaga(action) {
  try {
    const { fact, source, category } = action.payload;

    let query = supabase.from('facts').insert([{ text: fact, source, category }]);

    // Upload fact to supabase and receive the new fact object
    const { data: newFact, error } = yield call([query, query.select]);

    if (error) throw new Error(error.message);

    const facts = yield select(selectFactList);

    // add the new fact to the UI: add the fact to the state
    const updatedFacts = [newFact[0], ...facts];

    yield put(updateFactSuccess(updatedFacts));
    yield put(createFactSuccess());
  } catch (error) {
    yield put(createFactFailed(error));
  }
}
