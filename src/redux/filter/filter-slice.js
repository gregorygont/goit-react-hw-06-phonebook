import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (_, { payload }) => payload,
  },
});

// Ця конструкція використовує функцію createSlice для створення slice з ім'ям 'filter'.
// Параметри:
// name: Ім'я slice, яке буде використовуватися при автоматичній генерації імені дій та редюсера.
// initialState: Початковий стан slice. У даному випадку, початковий стан - порожній рядок.
// reducers: Об'єкт, який містить опис дій та відповідних їм редюсерів.
// setFilter: (_, { payload }) => payload,: Ця дія setFilter визначає редюсер для оновлення стану
// slice. Вона приймає дію та деструктурує її поле payload для отримання нового значення.
// Редюсер повертає це нове значення, яке і стане новим станом slice.

export const { setFilter } = filterSlice.actions; //Цей рядок експортує дію setFilter зі створеного slice. Це дозволяє імпортувати та використовувати цю дію в інших частинах додатку.

export default filterSlice.reducer; // Цей рядок експортує редюсер slice. Це дозволяє підключити цей редюсер до кореневого редюсера за допомогою combineReducers.
