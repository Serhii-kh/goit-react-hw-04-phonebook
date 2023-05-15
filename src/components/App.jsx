import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import shortid from 'shortid';
import css from '../components/wrapper/wrapper.module.css';

const initialContacts = [
	{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
	{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
	{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
	{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
]

export const App = () => {
	const [contacts, setContacts] = useState(initialContacts)
	const [filter, setFilter] = useState('')

	const addContact = (name, number) => {
		const contact = {
			name,
			number,
			id: shortid.generate(),
		};

		if (
			contacts.find(
				contact => contact.name.toLowerCase() === name.toLowerCase()
			)) { alert(`${name} is already in contacts!`) }
		else {
			setContacts(contacts => [...contacts, contact])
		}
	};

	const deleteContact = contactId => {
		setContacts(contacts => contacts.filter(contact => contact.id !== contactId))
	};

	const changeFilter = e => {
		const { value } = e.currentTarget;
		setFilter(value)
	};

	const getFilteredContacts = () => {
		const normalizedFilter = filter.toLowerCase();

		return contacts.filter(contact =>
			contact.name.toLowerCase().includes(normalizedFilter)
		);
	};

	useEffect(() => {
		const contacts = localStorage.getItem('contacts')
		const parsedContacts = JSON.parse(contacts)

		// parsedContacts ? setContacts(parsedContacts) : setContacts(initialContacts)

		if (parsedContacts) {
			setContacts(parsedContacts)
		}

		// localStorage.setItem('contacts', JSON.stringify(contacts))

	}, [])

	// useEffect(() => {
	// localStorage.setItem('contacts', JSON.stringify(contacts))
	// }, [contacts])

	// useEffect(() => {

	// })

	// componentDidUpdate(prevProps, prevState) {
	// 	const { contacts } = this.state

	// 	if (contacts !== prevState.contacts) {
	// 		localStorage.setItem('contacts', JSON.stringify(contacts))
	// 	}
	// }

	// componentDidMount() {
	// 	const contacts = localStorage.getItem('contacts')
	// 	const parsedContacts = JSON.parse(contacts)

	// 	if (parsedContacts) {
	// 		this.setState({
	// 			contacts: parsedContacts,
	// 		})
	// 	}
	// }

	const filteredContacts = getFilteredContacts();

	return (
		<div className={css.phonebook}>
			<h1>Phonebook</h1>
			<ContactForm onFormSubmit={addContact} />
			<h2>Contacts</h2>
			<Filter value={filter} onChange={changeFilter} />
			<ContactsList
				contacts={filteredContacts}
				onDeleteContact={deleteContact}
			/>
		</div>
	);
}

// [
// 	{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// 	{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// 	{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
// 	{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ]

