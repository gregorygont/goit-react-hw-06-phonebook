// If using Redux-Persist, you should specifically ignore all the action types it dispatches
// https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
import { configureStore } from '@reduxjs/toolkit'; // Цей рядок імпортує функцію configureStore з бібліотеки @reduxjs/toolkit, яка використовується для налаштування Redux-стору.
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'; // Цей рядок імпортує необхідні об'єкти та функції для підтримки персистентного збереження даних.
import storage from 'redux-persist/lib/storage'; // Цей рядок імпортує storage, яке представляє сховище, де дані будуть зберігатися (у нашому випадку це localStorage).

import { rootReducer } from './root-reducer';

// об'єкт налаштувань, в якому записані, які дані зберігати в Local Storage
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
}; //  Ця константа містить налаштування для персистентного збереження, key вказує ключ, під яким дані будуть зберігатися в сховищі, storage вказує, де зберігати дані (у цьому випадку, у localStorage).
//  whitelist вказує, які частини стану Redux зберігати. У даному випадку, буде збережений лише стан частини з ключем 'contacts'.

const persistedReducer = persistReducer(persistConfig, rootReducer); // Цей рядок створює персистентний редюсер на основі кореневого редюсера rootReducer і налаштувань persistConfig. Це дозволяє зберігати обрані частини стану в локальному сховищі.

export const store = configureStore({
  // Ця конструкція створює Redux-стор, використовуючи налаштований персистентний редюсер та middleware для обробки дій. Може також включати middleware, яке автоматично ігнорує деякі дії, які не підлягають серіалізації.
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Цей рядок створює персистор - об'єкт, який дозволяє здійснити персистентне збереження даних у
// локальному сховищі згідно налаштувань. Його можна використовувати для підтримки відновлення стану
// після перезавантаження додатка.
