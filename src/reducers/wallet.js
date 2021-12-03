import { ADD_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

// como adicionar um novo objeto no array. sintaxe para linha 14 encotrada em: https://stackoverflow.com/questions/40911194/how-do-i-add-an-element-to-array-in-reducer-of-react-native-redux
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.expense,
        id: state.expenses.length,
      }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id), // referência: https://www.ti-enxame.com/pt/javascript/excluir-um-item-do-estado-redux/826094201/
    };
  default:
    return state;
  }
}

export default wallet;
