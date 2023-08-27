import { useDispatch, useSelector } from 'react-redux';

import { IoPersonRemove } from 'react-icons/io5';
import { Btn, Item, List } from './ContactList.styled';

// redux
import { deleteContact } from 'redux/contacts/contacts-slice';
import { getFilteredContacts } from 'redux/contacts/contacts-selectors';

export const ContactList = () => {
  const filteredContacts = useSelector(getFilteredContacts); // За допомогою useSelector, ця змінна отримує відфільтрований список контактів зі стору Redux із застосуванням селектора getFilteredContacts.
  const dispatch = useDispatch(); // Змінна dispatch отримує функцію з useDispatch, яку можна використовувати для відправки дій (actions) до стору Redux.

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  //Ця функція визивається при натисканні на кнопку видалення контакту. Вона відправляє дію deleteContact до стору з ідентифікатором контакту для видалення.

  return (
    <List>
      {filteredContacts.map(({ name, number, id }) => {
        return (
          <Item key={id}>
            <span>{name}:</span>
            <span>{number}</span>
            <Btn type="button" onClick={() => onDeleteContact(id)}>
              <IoPersonRemove size="14" />
            </Btn>
          </Item>
        );
      })}
    </List>
  );
};

// У рендері компонента маємо <List>, де ми мапимо кожен відфільтрований контакт і відображаємо його
// інформацію, включаючи ім'я, номер та кнопку видалення з іконкою.
