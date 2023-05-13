import { ContactsListItem } from 'components/ContactsListItem/ContactsListItem';
import css from '../ContactsList/ContactList.module.css'
import PropTypes from 'prop-types';

export const ContactsList = ({ contacts, onDeleteContact }) => (
  <ul className={css.contactsList}>
    {contacts.map(({ name, number, id }) => (
      <ContactsListItem key={id} name={name} number={number}>
        <button type="button" onClick={() => onDeleteContact(id)}>
          Delete
        </button>
      </ContactsListItem>
    ))}
  </ul>
);

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
