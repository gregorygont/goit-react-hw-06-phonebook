import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import initialContacts from 'data/contacts.json';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addContact: {
      reducer: (state, { payload }) => {
        //state.push(payload);
        return [...state, payload];
      },
      // підготовча ф-ція
      prepare: data => {
        return {
          payload: {
            id: nanoid(),
            ...data,
          },
        };
      },
    },
    deleteContact: (state, { payload }) => {
      return state.filter(({ id }) => id !== payload);
    },
  },
});

//  Ця конструкція використовує функцію createSlice для створення slice з ім'ям 'contacts'.
// У внутрішньому об'єкті передаються наступні параметри:
// name: Ім'я slice, яке буде використовуватися при автоматичній генерації імені дій та редюсера.
// initialState: Початковий стан slice. У даному випадку, початковий стан - дані про контакти
// з файлу 'data/contacts.json'.
// reducers: Об'єкт, який містить опис дій та відповідних їм редюсерів.
// addContact: { ... },: Ця дія addContact визначає редюсер для додавання нового контакту до списку
// контактів. Вона містить підготовчу функцію prepare, яка генерує ідентифікатор та підготовлює дані
// для контакту перед їх додаванням.
// deleteContact: (state, { payload }) => { ... },: Ця дія deleteContact визначає редюсер для
// видалення контакту зі списку за допомогою фільтрування.

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
