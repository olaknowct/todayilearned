import { createSlice } from '@reduxjs/toolkit';

export const FACTS_INITIAL_STATE = {
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
    fetchFactsStart(state, action) {
      state.isLoading = true;
    },

    fetchFactsSuccess(state, action) {
      state.factList = action.payload;
      state.isLoading = false;
    },

    fetchFactsFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateFactSuccess(state, action) {
      state.factList = action.payload;
    },

    updateFactFailed(state, action) {
      state.error = action.payload;
    },

    setShowForm(state, action) {
      state.showForm = action.payload;
    },

    setCurrentCategory(state, action) {
      state.currentCategory = action.payload;
    },

    createFactStart(state, action) {
      state.isUploading = true;
    },

    createFactSuccess(state, action) {
      state.isUploading = false;
    },

    createFactFailed(state, action) {
      state.error = action.payload;
      state.isUploading = false;
    },
    updateFactStart(state, action) {},
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
