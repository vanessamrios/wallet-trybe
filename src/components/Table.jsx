import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  usedExchange(expense) {
    return Number(expense.exchangeRates[expense.currency].ask).toFixed(2);
  }

  convertedValue(expense) {
    const value = Number(expense.value);
    const usedExchange = Number(expense.exchangeRates[expense.currency].ask);
    const result = (value * usedExchange).toFixed(2);
    console.log(result);
    return result;
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={ index }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ expense.value }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>{ this.usedExchange(expense) }</td>
                <td>{ this.convertedValue(expense) }</td>
                <td>Real</td>
                <td>Botão</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
};
