import { combineReducers } from 'redux';
// Цей рядок імпортує функцію combineReducers з бібліотеки redux. Ця функція використовується для
// об'єднання різних редюсерів в один кореневий редюсер.

import contactsReducer from './contacts/contacts-slice'; //Він відповідає за управління станом контактів.
import filterReducer from './filter/filter-slice'; // відповідає за управління станом фільтрації контактів.

export const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});
// Ця конструкція використовує функцію combineReducers для об'єднання різних редюсерів у
// кореневий редюсер rootReducer. В об'єкті, який передається у combineReducers, вказуються
// редюсери та ключі, під якими вони будуть зберігатися у загальному стані.
