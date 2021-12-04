import { ADD_EXPENSE, CHANGE_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idToEdit: -1,
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
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.id,
    };
  case CHANGE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense.id === action.expense.id ? action.expense : expense)),
      idToEdit: -1,
    };
  default:
    return state;
  }
}

export default wallet;
