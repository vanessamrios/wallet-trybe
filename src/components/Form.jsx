import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseAndFetchExchangeRates } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      currencies: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.loadingCurrencies();
  }

  async loadingCurrencies() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    this.setState({ currencies: Object.keys(data) });
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
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      value,
      description,
      currency,
      method,
      tag,
    };
    saveExpense(expense);
    this.setState({
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
    const { currency, currencies } = this.state;
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
          {currencies.map((actualCurrency, index) => {
            if (actualCurrency === 'USDT') {
              return null;
            }
            return (
              <option
                data-testid={ actualCurrency }
                key={ index }
                value={ actualCurrency }
              >
                { actualCurrency }
              </option>
            );
          })}
        </select>
      </label>
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
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(addExpenseAndFetchExchangeRates(expense)),
});

Form.propTypes = {
  saveExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
