import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseAndFetchExchangeRates } from '../actions';

class Wallet extends React.Component {
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
  }

  // função totalExpenses encontrada no stack overflow https://stackoverflow.com/questions/5732043/how-to-call-reduce-on-an-array-of-objects-to-sum-their-properties
  totalExpenses() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, expense) => acc + Number(expense.value), 0);
    return total;
  }

  render() {
    const { value, description, currency, method, tag, currencies } = this.state;
    const { userEmail } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">{userEmail}</div>
          <div data-testid="total-field">{this.totalExpenses()}</div>
          <div data-testid="header-currency-field">BRL</div>
        </header>
        <form>
          <input
            data-testid="value-input"
            type="text"
            value={ value }
            name="value"
            onChange={ this.handleChange }
          />
          <input
            data-testid="description-input"
            type="text"
            value={ description }
            name="description"
            onChange={ this.handleChange }
          />
          <label htmlFor="currency-input">
            Moeda:
            <select id="currency-input" data-testid="currency-input" value={ currency } name="moeda" onChange={ this.handleChange }>
              {currencies.map((actualCurrency, index) => {
                if (actualCurrency === 'USDT') {
                  return null;
                }
                return <option data-testid={ actualCurrency } key={ index } value={ actualCurrency }>{ actualCurrency }</option>
              })}
            </select>
          </label>
          <select data-testid="method-input" value={ method } name="method" onChange={ this.handleChange }>
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input" value={ tag } name="tag" onChange={ this.handleChange }>
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

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  saveExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
