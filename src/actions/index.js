export const SAVE_EMAIL = 'SAVE_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const CHANGE_EXPENSE = 'CHANGE_EXPENSE';
export const LOAD_CURRENCIES = 'LOAD_CURRENCIES';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const changeExpense = (expense) => ({
  type: CHANGE_EXPENSE,
  expense,
});

export const addExpenseAndFetchExchangeRates = (expense) => async (dispatch) => {
  try {
    if (expense.id === -1) {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const expenseWithExchangeRates = { ...expense, exchangeRates: data };

      return dispatch(addExpense(expenseWithExchangeRates));
    }

    return dispatch(changeExpense(expense));
  } catch (error) {
    // dispatch(failedRequest(error));
  }
};

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  id,
});

export const loadCurrencies = (currencies) => ({
  type: LOAD_CURRENCIES,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const currencies = Object.keys(data);
    return dispatch(loadCurrencies(currencies));
  } catch (error) {
    // dispatch(failedRequest(error));
  }
};
