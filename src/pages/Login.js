import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // função handleClick retirada do course

  handleClick() {
    const { history, userEmail } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    userEmail(email);
  }

  // função validateEmail encontrada no stack overflow https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  validate(email, password) {
    const minPasswordSize = 6;
    if (this.validateEmail(email) && password.length >= minPasswordSize) {
      return true;
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <input
          type="text"
          name="email"
          value={ email }
          data-testid="email-input"
          placeholder="E-mail"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="password"
          value={ password }
          data-testid="password-input"
          placeholder="Senha"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ !this.validate(email, password) }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userEmail: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  userEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
