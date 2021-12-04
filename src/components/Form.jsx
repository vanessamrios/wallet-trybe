import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseAndFetchExchangeRates, fetchCurrencies } from '../actions';
import { INITIAL_ID } from '../actions/constants';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: INITIAL_ID,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { loadingCurrencies } = this.props;
    loadingCurrencies();
  }

  componentDidUpdate() {
    const { expenseToEdit } = this.props;
    const { id } = this.state;

    if (expenseToEdit !== null && id !== expenseToEdit.id) {
      this.loadingExpenseToEdit(expenseToEdit);
    }
  }

  loadingExpenseToEdit(expenseToEdit) {
    this.setState({
      id: expenseToEdit.id,
      value: expenseToEdit.value,
      description: expenseToEdit.description,
      currency: expenseToEdit.currency,
      method: expenseToEdit.method,
      tag: expenseToEdit.tag,
      exchangeRates: expenseToEdit.exchangeRates,
    });
  }

  // função handleChange retirada do course

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  // função handleClick retirada do course

  handleClick() {
    const { saveExpense } = this.props;
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    saveExpense(expense);
    this.setState({
      id: INITIAL_ID,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Pagamento',
      tag: 'Categoria',
    });
  }

  renderInput(placeholder, dataTestid, value, name) {
    return (
      <input
        placeholder={ placeholder }
        data-testid={ dataTestid }
        type="text"
        value={ value }
        name={ name }
        onChange={ this.handleChange }
      />
    );
  }

  renderComboboxCurrency() {
    const { currency } = this.state;
    const { currencies } = this.props;
    return (
      <label htmlFor="currency">
        Moeda
        <select
          id="currency"
          data-testid="currency-input"
          value={ currency }
          name="currency"
          onChange={ this.handleChange }
        >
          {currencies.map((actualCurrency, index) => (
            <option
              data-testid={ actualCurrency }
              key={ index }
              value={ actualCurrency }
            >
              { actualCurrency }
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderButton() {
    const { expenseToEdit } = this.props;
    if (expenseToEdit) {
      return (
        <button type="button" onClick={ this.handleClick }>Editar despesa</button>
      );
    }
    return (
      <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
    );
  }

  render() {
    const { value, description, method, tag } = this.state;
    return (
      <div>
        <form>
          {this.renderInput('Valor da despesa', 'value-input', value, 'value')}
          {this.renderInput(
            'Descrição da despesa', 'description-input', description, 'description',
          )}
          {this.renderComboboxCurrency()}
          <select
            data-testid="method-input"
            value={ method }
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          {this.renderButton()}
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenseToEdit: state.wallet.expenses
    .find((expense) => expense.id === state.wallet.idToEdit),
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(addExpenseAndFetchExchangeRates(expense)),
  loadingCurrencies: () => dispatch(fetchCurrencies()),
});

Form.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  loadingCurrencies: PropTypes.func.isRequired,
  expenseToEdit: PropTypes.shape(Object),
  currencies: PropTypes.arrayOf(String).isRequired,
};

Form.defaultProps = {
  expenseToEdit: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
