import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState: {
		loading: false,
		pokemons: [],
		pokemonDetail: [],
		favPokemons: localStorage.getItem('pokeApp-fav')
			? JSON.parse(localStorage.getItem('pokeApp-fav'))
			: [],
		error: '',
		totalCount: '',
	},
	reducers: {
		getPokemonsRequest(state) {
			state.loading = true;
		},
		getPokemonsSuccess(state, action) {
			state.loading = false;
			state.pokemons = action.payload.data;
			state.totalCount = action.payload.totalCount;
		},
		getPokemonsFailure(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		getPokemonDetail(state, action) {
			state.loading = false;
			state.pokemonDetail = action.payload.data;
		},
		addPokemonToFav(state, action) {
			state.favPokemons = [{ ...action.payload }, ...state.favPokemons];
		},
		removePokemonFromFav(state, action) {
			state.favPokemons = state.favPokemons.filter(
				(item) => item.id !== action.payload
			);
		},
	},
});

export const pokemonActions = pokemonSlice.actions;

export default pokemonSlice;
