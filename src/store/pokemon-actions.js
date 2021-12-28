import { pokemonActions } from './pokemon-slice';
import { filterActions } from './filter-slice';
import axios from 'axios';

export const getPokemons = (pageNumber, pageSize, name, type, subtype) => {
	return async (dispatch) => {
		dispatch(pokemonActions.getPokemonsRequest());

		const getPoke = async () => {
			const response = await axios.get(
				`https://api.pokemontcg.io/v2/cards?page=${pageNumber}&pageSize=${pageSize}&q=%20name:${name}*${type}${subtype}`,
				{
					headers: {
						'X-Api-Key': '11f2cb7b-47e8-4f51-93bc-53c692d0cf9b',
					},
				}
			);
			return response.data;
		};

		try {
			const pokemons = await getPoke();
			dispatch(pokemonActions.getPokemonsSuccess(pokemons));
		} catch (error) {
			dispatch(pokemonActions.getPokemonsFailure(error.message));
		}
	};
};

export const getPokemonDetail = (pokemonId) => {
	return async (dispatch) => {
		dispatch(pokemonActions.getPokemonsRequest());

		const getDetail = async () => {
			const response = await axios.get(
				`https://api.pokemontcg.io/v2/cards?q=id:${pokemonId}`,
				{
					headers: {
						'X-Api-Key': '11f2cb7b-47e8-4f51-93bc-53c692d0cf9b',
					},
				}
			);
			return response.data;
		};

		try {
			const detail = await getDetail();
			dispatch(pokemonActions.getPokemonDetail(detail));
		} catch (error) {
			dispatch(pokemonActions.getPokemonsFailure(error.message));
		}
	};
};

export const addPokemonToFav = (pokemon) => {
	return (dispatch) => {
		dispatch(pokemonActions.addPokemonToFav(pokemon));
	};
};

export const removePokemonFromFav = (pokemonId) => {
	return (dispatch) => {
		dispatch(pokemonActions.removePokemonFromFav(pokemonId));
	};
};

export const changePerPage = (perPage) => {
	return (dispatch) => {
		dispatch(filterActions.changePerPageValue(perPage));
	};
};

export const changeCurrentPage = (page) => {
	return (dispatch) => {
		dispatch(filterActions.changeCurrentPageValue(page));
	};
};

export const getAllPokeTypes = () => {
	return (dispatch) => {
		axios
			.get('https://api.pokemontcg.io/v2/types', {
				headers: {
					'X-Api-Key': '11f2cb7b-47e8-4f51-93bc-53c692d0cf9b',
				},
			})
			.then((response) => {
				dispatch(filterActions.getTypes(response.data));
			});
	};
};

export const getAllPokeSubtypes = () => {
	return (dispatch) => {
		axios
			.get('https://api.pokemontcg.io/v2/subtypes', {
				headers: {
					'X-Api-Key': '11f2cb7b-47e8-4f51-93bc-53c692d0cf9b',
				},
			})
			.then((response) => {
				dispatch(filterActions.getSubtypes(response.data));
			});
	};
};

export const getChosenType = (type) => {
	return (dispatch) => {
		dispatch(filterActions.getChosenType(type));
	};
};

export const getChosenSubtype = (subtype) => {
	return (dispatch) => {
		dispatch(filterActions.getChosenSubtype(subtype));
	};
};

export const getChosenName = (name) => {
	return (dispatch) => {
		dispatch(filterActions.getChosenName(name));
	};
};
