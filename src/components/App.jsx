import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import shortid from 'shortid';
import css from '../components/wrapper/wrapper.module.css';

export class App extends Component {
	state = {
		contacts: [
			{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
			{ id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
			{ id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
			{ id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
		],
		filter: '',
	};

	addContact = (name, number) => {
		const { contacts } = this.state;
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
			this.setState(prevState => ({
				contacts: [...prevState.contacts, contact],
			}));
		}
	};

	deleteContact = contactId => {
		this.setState(prevState => ({
			contacts: prevState.contacts.filter(contact => contact.id !== contactId),
		}));
	};

	changeFilter = e => {
		const { value } = e.currentTarget;

		this.setState({
			filter: value,
		});
	};

	getFilteredContacts = () => {
		const { contacts, filter } = this.state;
		const normalizedFilter = filter.toLowerCase();

		return contacts.filter(contact =>
			contact.name.toLowerCase().includes(normalizedFilter)
		);
	};

	componentDidUpdate(prevProps, prevState) {
		const { contacts } = this.state

		if (contacts !== prevState.contacts) {
			localStorage.setItem('contacts', JSON.stringify(contacts))
		}
	}

	componentDidMount() {
		const contacts = localStorage.getItem('contacts')
		const parsedContacts = JSON.parse(contacts)

		if (parsedContacts) {
			this.setState({
				contacts: parsedContacts,
			})
		}

	}

	render() {
		const { filter } = this.state;
		const filteredContacts = this.getFilteredContacts();

		return (
			<div className={css.phonebook}>
				<h1>Phonebook</h1>
				<ContactForm onFormSubmit={this.addContact} />
				<h2>Contacts</h2>
				<Filter value={filter} onChange={this.changeFilter} />
				<ContactsList
					contacts={filteredContacts}
					onDeleteContact={this.deleteContact}
				/>
			</div>
		);
	}
}
