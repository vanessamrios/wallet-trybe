export const SAVE_EMAIL = 'SAVE_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const addExpenseAndFetchExchangeRates = (expense) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const expenseWithExchangeRates = { ...expense, exchangeRates: data };
    return dispatch(addExpense(expenseWithExchangeRates));
  } catch (error) {
    // dispatch(failedRequest(error));
  }
};

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});
