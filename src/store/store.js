import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware]; //tecnique : see redux-devtools section how

// // Root-reducer
export const store = configureStore({
  reducer: rootReducer, // points to reducer
  middleware: middlewares, // has default middleware but if declared then default are overlapped
});

sagaMiddleware.run(rootSaga);
