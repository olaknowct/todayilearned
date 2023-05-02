import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleVoteType } from '../../component/fact/fact.component';
import { formFieldType } from '../../component/new-fact-form/new-fact-form.component';

export type FactType = {
  id: number;
  created_at: Date;
  text: string;
  source: string;
  category: string;
  votesInteresting: number;
  votesMindBlowing: number;
  votesFalse: number;
};

export interface FactsState {
  factList: FactType[];
  isLoading: boolean;
  showForm: boolean;
  error: string | null;
  isUploading: boolean;
  currentCategory: string;
}

export const FACTS_INITIAL_STATE: FactsState = {
  factList: [],
  isLoading: false,
  showForm: false,
  error: null,
  isUploading: false,
  currentCategory: 'all',
};

export const factsSlice = createSlice({
  name: 'facts',
  initialState: FACTS_INITIAL_STATE,
  reducers: {
    fetchFactsStart(state) {
      state.isLoading = true;
    },

    fetchFactsSuccess(state, action: PayloadAction<FactType[]>) {
      state.factList = action.payload;
      state.isLoading = false;
    },

    fetchFactsFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateFactSuccess(state, action: PayloadAction<FactType[]>) {
      state.factList = action.payload;
    },

    updateFactFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },

    setShowForm(state, action: PayloadAction<boolean>) {
      state.showForm = action.payload;
    },

    setCurrentCategory(state, action: PayloadAction<string>) {
      state.currentCategory = action.payload;
    },

    createFactStart(state, action: PayloadAction<formFieldType>) {
      state.isUploading = true;
    },

    createFactSuccess(state) {
      state.isUploading = false;
    },

    createFactFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isUploading = false;
    },
    updateFactStart(state, action: PayloadAction<handleVoteType>) {},
  },
});

export const {
  updateFactSuccess,
  updateFactFailed,
  fetchFactsStart,
  fetchFactsSuccess,
  fetchFactsFailed,
  setShowForm,
  setCurrentCategory,
  createFactStart,
  createFactSuccess,
  createFactFailed,
  updateFactStart,
} = factsSlice.actions;

export const factsReducer = factsSlice.reducer;

// export const updateFactStart = createAction('facts/updateFactStart');
