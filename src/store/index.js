import { compose, createStore } from 'redux';
import rootReducer from '../reducers';

const extention = window.devToolsExtention() || ((f) => f);

const store = createStore(rootReducer, compose(extention));

export default store;
