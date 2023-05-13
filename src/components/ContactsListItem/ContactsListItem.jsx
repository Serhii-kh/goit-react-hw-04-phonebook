import css from '../ContactsListItem/ContactsListItem.module.css'
import PropTypes from 'prop-types';

export const ContactsListItem = ({ name, number, children }) =>
(<li className={css.ContactsListItem} >
	<p>
		{name} : {number}
	</p>
	{children}
</li>)


ContactsListItem.protoTypes = {
	name: PropTypes.string.isRequired,
	number: PropTypes.number.isRequired,
}