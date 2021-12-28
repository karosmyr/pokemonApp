import { combineReducers } from 'redux';
import pokeReducer from './pokeReducer';

const rootReducer = combineReducers({
	pokemons: pokeReducer,
});

export default rootReducer;
