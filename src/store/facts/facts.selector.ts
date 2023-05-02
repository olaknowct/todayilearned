import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectFactsReducer = (state: RootState) => state.facts;

export const selectCurrentCategory = createSelector(
  [selectFactsReducer],
  (facts) => facts.currentCategory
);

export const selectFactList = createSelector([selectFactsReducer], (facts) => facts.factList);

export const selectFactsCount = createSelector([selectFactList], (factList) => factList.length);
export const selectShowForm = createSelector([selectFactsReducer], (facts) => facts.showForm);

export const selectFactsisLoading = createSelector(
  [selectFactsReducer],
  (facts) => facts.isLoading
);

export const selectFactsisUploading = createSelector(
  [selectFactsReducer],
  (facts) => facts.isUploading
);
