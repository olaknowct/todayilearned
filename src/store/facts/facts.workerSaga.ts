import { call, put, select } from 'redux-saga/effects';
import {
  fetchFactsFailed,
  fetchFactsSuccess,
  updateFactSuccess,
  updateFactFailed,
  createFactSuccess,
  createFactFailed,
  FactType,
} from './facts.reducer';
import supabase from '../../supabase';
import { selectCurrentCategory, selectFactList } from './facts.selector';
import { handleVoteType } from '../../component/fact/fact.component';
import { formFieldType } from '../../component/new-fact-form/new-fact-form.component';

// Fetch Users Saga
export function* fetchFactsSaga() {
  try {
    const currentCategory: string = yield select(selectCurrentCategory);

    let query = supabase.from('facts').select('*');

    if (currentCategory !== 'all') query = query.eq('category', currentCategory);

    query = query.order('votesInteresting', { ascending: true });

    const { data: facts, error }: { data: FactType[]; error: Error | null } = yield call(
      [query, query.limit],
      100
    );

    if (error) throw new Error(error.message);

    yield put(fetchFactsSuccess(facts));
  } catch (error) {
    yield put(fetchFactsFailed(error as string));
  }
}

export function* updateFactSaga({
  payload: { factType, factId, totalVote },
}: {
  payload: handleVoteType;
}) {
  try {
    let query = supabase
      .from('facts')
      .update({ [factType]: totalVote })
      .eq('id', factId);

    const { data: updatedFact, error }: { data: FactType[]; error: Error | null } = yield call([
      query,
      query.select,
    ]);

    if (error) throw new Error(error.message);

    const facts: FactType[] = yield select(selectFactList);

    const updatedFacts = facts.map((fact) => (fact.id === factId ? updatedFact[0] : fact));

    yield put(updateFactSuccess(updatedFacts));
  } catch (error) {
    yield put(updateFactFailed(error as string));
  }
}

export function* createFactSaga({
  payload: { fact, source, category },
}: {
  payload: formFieldType;
}) {
  try {
    let query = supabase.from('facts').insert([{ text: fact, source, category }]);

    // Upload fact to supabase and receive the new fact object
    const { data: newFact, error } = yield call([query, query.select]);

    if (error) throw new Error(error.message);

    const facts: FactType[] = yield select(selectFactList);

    // add the new fact to the UI: add the fact to the state
    const updatedFacts = [newFact[0], ...facts];

    yield put(updateFactSuccess(updatedFacts));
    yield put(createFactSuccess());
  } catch (error) {
    yield put(createFactFailed(error as string));
  }
}
