import { Component } from "react";
import css from '../ContactForm/ContactForm.module.css';
import PropTypes from 'prop-types';


export class ContactForm extends Component {
	state = {
		name: '',
		number: '',
	}

	handleChange = e => {
		const { name, value } = e.currentTarget;

		this.setState(
			{ [name]: value },
		)
	}

	handleSubmit = e => {
		e.preventDefault();
		const { name, number } = this.state;

		this.props.onFormSubmit(name, number);
		this.reset()
	}

	reset = () => {
		this.setState({
			name: '',
			number: '',
		})
	}

	render() {
		return (
			<>
				<form className={css.ContactForm}
					onSubmit={this.handleSubmit}>
					<label>Name
						<input
							type="text"
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
							pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
							title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
							required
						/>
					</label>
					<label>Number
						<input
							type="tel"
							name="number"
							onChange={this.handleChange}
							value={this.state.number}
							pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
							title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
							required
						/>
					</label>
					<button type="submit" className={css.submitBtn}>Add contact</button>
				</form>
			</>
		)
	}
}

ContactForm.propTypes = {
	onFormSubmit: PropTypes.func.isRequired,
}