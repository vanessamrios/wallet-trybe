import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
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

  render() {
    const { value, description, currency, method, tag, currencies } = this.state;
    return (
      <div>
        <Header />
        <form>
          <input
            placeholder="Valor da despesa"
            data-testid="value-input"
            type="text"
            value={ value }
            name="value"
            onChange={ this.handleChange }
          />
          <input
            placeholder="Descrição da despesa"
            data-testid="description-input"
            type="text"
            value={ description }
            name="description"
            onChange={ this.handleChange }
          />
          <label htmlFor="currency">
            Moeda
            <select id="currency" data-testid="currency-input" value={ currency } name="currency" onChange={ this.handleChange }>
              {currencies.map((actualCurrency, index) => {
                if (actualCurrency === 'USDT') {
                  return null;
                }
                return <option data-testid={ actualCurrency } key={ index } value={ actualCurrency }>{ actualCurrency }</option>;
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
  saveExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
