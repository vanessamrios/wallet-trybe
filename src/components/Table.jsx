import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    return (
      <div>
        <table>
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
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);

// Table.propTypes = {
//   expenses: PropTypes.arrayOf(Object).isRequired,
// };
