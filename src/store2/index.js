import { configureStore } from '@reduxjs/toolkit';
import pokemonSlice from './pokemon-slice';
import filterSlice from './filter-slice';

const store = configureStore({
	reducer: { pokemons: pokemonSlice.reducer, filter: filterSlice.reducer },
});

export default store;