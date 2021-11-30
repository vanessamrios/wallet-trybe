import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
// função totalExpenses encontrada no stack overflow https://stackoverflow.com/questions/5732043/how-to-call-reduce-on-an-array-of-objects-to-sum-their-properties

  totalExpenses() {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, expense) => {
      const moeda = expense.currency;
      const cotacao = expense.exchangeRates[moeda].ask;
      return acc + (Number(expense.value) * Number(cotacao));
    }, 0);
    return total;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">{userEmail}</div>
          <div data-testid="total-field">{this.totalExpenses()}</div>
          <div data-testid="header-currency-field">BRL</div>
        </header>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};
