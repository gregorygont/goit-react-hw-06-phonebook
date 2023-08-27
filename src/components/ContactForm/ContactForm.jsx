import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'yup-phone';

// toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastifyOptions } from 'utils/toastifyOptions';

// redux
import { addContact } from 'redux/contacts/contacts-slice';
import { getContacts } from 'redux/contacts/contacts-selectors';

import { BsFillTelephoneFill, BsPersonFill } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io';

import {
  Form,
  FormField,
  FieldFormik,
  ErrorMessage,
  StyledButton,
  LabelWrapper,
  LabelSpan,
} from './ContactForm.styled';

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required(),
  number: yup
    .string()
    .phone(
      'UA',
      true,
      'Phone number must be a valid phone number for region UA, digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

// Схема валідації schema: Використовує бібліотеку yup для визначення схеми валідації для полів "name" і "number". Це допомагає перевіряти правильність введених даних перед відправкою форми.

const initialValues = { name: '', number: '' }; // initialValues: Початкові значення полів форми.

export const ContactForm = () => {
  const contacts = useSelector(getContacts); // Цей рядок використовує хук useSelector для отримання даних зі стору Redux. getContacts є селектором, який вибирає список контактів зі стору. Після виконання цього рядка змінна contacts буде містити дані про контакти зі стору.
  const dispatch = useDispatch(); // Цей рядок використовує хук useDispatch для отримання функції диспетчера зі стору Redux. Диспетчер дозволяє відправляти дії (actions) до стору, щоб вплинути на стан додатку.

  const isDublicate = ({ name, number }) => {
    // Функція isDublicate: Перевіряє, чи існує вже контакт з таким самим ім'ям або номером серед наявних контактів. Якщо такий контакт вже існує, функція повертає true.
    const normalizedName = name.toLowerCase().trim();
    const normalizedNumber = number.trim();

    const dublicate = contacts.find(
      contact =>
        contact.name.toLowerCase().trim() === normalizedName ||
        contact.number.trim() === normalizedNumber
    );
    return Boolean(dublicate);
  };

  const onAddContact = ({ name, number }) => {
    // Функція onAddContact: Викликається при натисканні кнопки "Add contact". Перевіряє, чи існує дублікат контакту за допомогою функції isDublicate. Якщо дублікат знайдений, виводить помилку за допомогою toast.error. Якщо немає дублікату, відправляє дію addContact до стору Redux з ім'ям та номером нового контакту.
    if (isDublicate({ name, number })) {
      return toast.error(
        `This contact is already in contacts`,
        toastifyOptions
      );
    }
    dispatch(addContact({ name, number }));
  };
  return (
    <Formik // Тут використовуємо компонент Formik для управління формою. Включає поля для введення імені та номеру контакту, а також кнопку "Add contact". Поля пов'язані зі схемою валідації та відображають повідомлення про помилки, якщо дані не відповідають вимогам.
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        // Властивість onSubmit: Викликається при поданні форми. Викликає функцію onAddContact та очищає форму після відправки.
        onAddContact({ ...values });
        resetForm();
      }}
      validationSchema={schema}
    >
      <Form autoComplete="off">
        <FormField>
          <LabelWrapper>
            <BsPersonFill />
            <LabelSpan>Name</LabelSpan>
          </LabelWrapper>
          <FieldFormik type="text" name="name" placeholder="Name" />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField>
          <LabelWrapper>
            <BsFillTelephoneFill />
            <LabelSpan>Number</LabelSpan>
          </LabelWrapper>
          <FieldFormik
            type="tel"
            name="number"
            placeholder="+38-050-123-45-67"
          />
          <ErrorMessage name="number" component="span" />
        </FormField>
        <StyledButton type="submit">
          <IoMdPersonAdd size="16" />
          Add contact
        </StyledButton>
      </Form>
    </Formik>
  );
};
// І наостанок виводиться структура форми з використанням компонентів для полів та кнопки.
