import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseAndFetchExchangeRates } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: -1,
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

  // A documentação sugere o componentDidUpdate(), mas não consegui usar o setState() no didUpdate e por isso decidi usar getDerivedStateFromProps()
  // Esse metodo do React atualiza o estado interno a partir de mudanças nas props (que foram alteradas pelo estado global, através do mapStateToProps)
  // referência: documentação (https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops)
  static getDerivedStateFromProps(props, state) {
    if (props.expenseToEdit) {
      console.log('é isso mesmo');
      return {
        ...state,
        id: props.expenseToEdit.id,
        value: props.expenseToEdit.value,
        description: props.expenseToEdit.description,
        currency: props.expenseToEdit.currency,
        method: props.expenseToEdit.method,
        tag: props.expenseToEdit.tag,
      };
    }
    return null;
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
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(addExpenseAndFetchExchangeRates(expense)),
});

Form.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  expenseToEdit: PropTypes.shape(Object),
};

Form.defaultProps = {
  expenseToEdit: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
