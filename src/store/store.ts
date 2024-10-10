import rootReducer from '@store/reducers';
import rootSaga from '@store/sagas';
import { RootState } from '@store/types';
import { applyMiddleware, createStore, Store } from 'redux';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

const persistConfig = {
  key: 'theme',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const store: any = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persistor,store };