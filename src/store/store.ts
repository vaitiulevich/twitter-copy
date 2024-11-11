import rootReducer from '@store/reducers';
import rootSaga from '@store/sagas';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme', 'user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer as RootState);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persistor, store };
