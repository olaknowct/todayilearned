import { combineReducers } from '@reduxjs/toolkit';
import { factsReducer } from './facts/facts.reducer';

export const rootReducer = combineReducers({
  facts: factsReducer,
});
